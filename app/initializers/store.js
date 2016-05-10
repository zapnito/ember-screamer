import reduce from 'ember-screamer/reducer/reduce';
import Redux from 'npm:redux';

let { createStore } = Redux;

class StoreProxy {
  constructor(store) {
    this._store = store;
  }

  getState() {
    return this._store.getState();
  }

  dispatch(...args) {
    console.log('dispatch', ...args);
    let result = this._store.dispatch(...args);
    window.state = this.getState();
    return result;
  }

  subscribe(...args) {
    return this._store.subscribe(...args);
  }
}

let store = new StoreProxy(createStore(reduce));

export function initialize(application) {
  application.register('service:store', store, { instantiate: false });
}

export default {
  name: 'store',
  initialize
};
