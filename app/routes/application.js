import Ember from 'ember';

export default Ember.Route.extend({
  state: Ember.inject.service('state'),

  model() {
    return this.get('state').subscribe('conversations', 'lobby');
  }
});
