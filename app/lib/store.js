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
      this._state = this._reduce(this._state, operation);
      this._broadcasts.trigger('updated', this._state);
    });
  }

  subscribe(...path) {
    let subscription = Ember.ObjectProxy.create({});
    this._updateSubscription(subscription, this._state, path);

    this._broadcasts.on('updated', state => {
      this._updateSubscription(subscription, state, path);
    });

    return subscription;
  }

  _updateSubscription(subscription, state, path) {
    subscription.set('content', state.getIn(path).toJS());
  }
}
