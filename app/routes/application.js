import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service('store'),
  channels: Ember.inject.service('channels'),

  model() {
    this.get('channels').join('conversations:index', ['addConversation']);
    return this.get('store').subscribeToArray(state => {
      return state.get('conversations').toIndexedSeq().sortBy(c => c.get('name')).toJS();
    });
  }
});
