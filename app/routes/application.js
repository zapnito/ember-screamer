import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service('store'),
  channels: Ember.inject.service('channels'),

  beforeModel() {
    this.transitionTo('conversation', 'eecf4c2b-f6e5-3ae3-bef7-1ea09f91d3e7');
  },

  model() {
    this.get('channels').join('conversations:index', ['addConversation']);
    return this.get('store').subscribeToArray(state => {
      return state.get('conversations').toIndexedSeq().toJS();
    });
  }
});
