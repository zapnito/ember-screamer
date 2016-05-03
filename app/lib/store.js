import Ember from 'ember';

export default class {
  constructor(initialState, reduce) {
    this._state = initialState;
    this._broadcasts = Ember.Object.extend(Ember.Evented).create();
    this._queue = Ember.RSVP.resolve();
    this._reduce = reduce;
  }

  dispatch(operation) {
    this._queue = this._queue.finally(() => {
      let state = this._reduce(this._state, operation);
      if (!state) debugger;
      Ember.run(() => {
        this._broadcasts.trigger('updated', state);
        this._state = state;
        window.state = state;
      });
    });
  }

  subscribe(extractor) {
    let subscription = Ember.ObjectProxy.create({});
    subscription.set('content', extractor(this._state))

    this._broadcasts.on('updated', state => {
      subscription.set('content', extractor(state));
    });

    return subscription;
  }

  subscribeToArray(extractor) {
    let subscription = Ember.ArrayProxy.create({});
    subscription.set('content', extractor(this._state))

    this._broadcasts.on('updated', state => {
      subscription.set('content', extractor(state));
    });

    return subscription;
  }
}
