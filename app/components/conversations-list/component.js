import Ember from 'ember';

export default Ember.Component.extend({
  conversations: null,
  channels: Ember.inject.service('channels'),

  reset() {
    this.set('name', null);
  },

  actions: {
    addConversation() {
      let { name } = this.getProperties('name');
      this.reset();
      let conversationId = this.add(name);
      this.get('router').transitionTo('conversation', conversationId);
    }
  }
});
