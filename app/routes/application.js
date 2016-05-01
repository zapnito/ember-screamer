import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service('store'),
  channels: Ember.inject.service('channels'),

  model() {
    this.get('channels').join('conversations:lobby', ['addMessage']);
    return this.get('store').subscribe('conversations', 'lobby');
  }
});
