export default class Channel {
  constructor(socket, topic, store, actionTypes = []) {
    this._channel = socket.channel(topic);
    this._store = store;
    this._topic = topic;

    actionTypes.forEach(actionType => this._channel.on(actionType, payload => {
      store.dispatch(Object.assign({ topic, type: actionType, status: 'received' }, payload));
    }));
  }

  join() {
    let store = this._store;
    let channel = this._channel;
    let topic = this._topic;

    store.dispatch({ topic, type: 'join', status: 'requested' });

    return new Ember.RSVP.Promise((resolve, reject) => {
      channel.join()
        .receive('ok', payload => {
          store.dispatch({ topic, type: 'join', status: 'succeeded', payload });
          resolve();
        })
        .receive('error', reason => {
          store.dispatch({ topic, type: 'join', status: 'failed', reason });
          reject(reason);
        });
    });
  }

  dispatch(action) {
    let topic = this._topic;
    let store = this._store;

    store.dispatch(Object.assign({ topic, status: 'requested' }, action));

    this._channel.push(action.type, action)
      .receive('ok', payload => store.dispatch(Object.assign({ topic, type: action.type, status: 'succeeded' }, payload)))
      .receive('error', reason => store.dispatch(Object.assign({ topic, type: action.type, status: 'failed' }, reason)));
  }
}
