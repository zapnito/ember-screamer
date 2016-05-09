import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service('store'),
  conversations: Ember.inject.service('conversations'),

  model() {
    let conversations = this.get('conversations');
    return conversations.subscribeToList().then(() => conversations.getList());
  }
});
