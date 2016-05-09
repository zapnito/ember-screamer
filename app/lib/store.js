import Ember from 'ember';

export default class {
  constructor(initialState, reduce) {
    this._state = initialState;
    this._broadcasts = Ember.Object.extend(Ember.Evented).create();
    this._queue = Ember.RSVP.resolve();
    this._reduce = reduce;
  }

  getState() {
    return this._state;
  }

  dispatch(action) {
    this._queue = this._queue.finally(() => {
      let state = this._reduce(this._state, action);
      if (!state) debugger;

      this._state = state;

      window.state = state;
      this._broadcasts.trigger('updated', state);
    });
  }

  subscribe(callback) {
    let subscription = Ember.ObjectProxy.create({});
    subscription.set('content', callback());

    this._broadcasts.on('updated', state => {
      subscription.set('content', callback());
    });

    return subscription;
  }
}
