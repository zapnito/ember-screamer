import Store from 'ember-screamer/lib/store';
import initialState from 'ember-screamer/reducer/initial-state';
import reduce from 'ember-screamer/reducer/reduce';

export function initialize(application) {
  let store = new Store(initialState(), reduce);
  application.register('service:store', store, { instantiate: false });
}

export default {
  name: 'store',
  initialize
};
