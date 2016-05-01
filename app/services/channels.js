import Phoenix from "npm:phoenix";

let socket = new Phoenix.Socket("ws://localhost:4000/socket", {
  // params: {token: window.userToken},
  logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
});

socket.connect();


class Channel {
  constructor(topic, store, ops = []) {
    this._channel = socket.channel(topic);
    this._store = store;
    this._topic = topic;

    store.dispatch({ topic, op: 'join', status: 'requested' });

    ops.forEach(op => this._channel.on(op, payload => {
      store.dispatch(Object.assign({ topic, op, status: 'received' }, payload));
    }));

    this._channel.join()
      .receive('ok', payload => store.dispatch({ topic, op: 'join', status: 'succeeded', payload }))
      .receive('error', reason => store.dispatch({ topic, op: 'join', status: 'failed', reason }));
  }

  dispatch(operation) {
    let topic = this._topic;
    let store = this._store;

    store.dispatch(Object.assign({ topic, status: 'requested' }, operation));

    this._channel.push(operation.op, operation)
      .receive('ok', payload => store.dispatch(Object.assign({ topic, op: operation.op, status: 'succeeded' }, payload)))
      .receive('error', reason => store.dispatch(Object.assign({ topic, op: operation.op, status: 'failed' }, payload)))
  }
}

export default Ember.Service.extend({
  store: Ember.inject.service('store'),

  init() {
    this._super();
    this._channels = {};
  },

  join(topic, ops) {
    this._channels[topic] = new Channel(topic, this.get('store'), ops);
  },

  dispatch(topic, operation) {
    let channel = this._channels[topic];

    if (!channel) {
      throw new Error("Topic not subscribed to: ${topic}");
    }

    channel.dispatch(operation);
  }
});
