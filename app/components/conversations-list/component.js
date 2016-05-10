import Ember from 'ember';

export default Ember.Component.extend({
  conversations: null,
  conversationsService: Ember.inject.service('conversations'),

  reset() {
    this.set('name', null);
  },

  actions: {
    addConversation() {
      let conversationsService = this.get('conversationsService');
      let { name } = this.getProperties('name');
      this.reset();
      let conversationId = conversationsService.add(name);
      this.get('router').transitionTo('conversation', conversationId);
    }
  }
});
