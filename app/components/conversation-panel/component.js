import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service('store'),
  conversation: null,

  reset() {
    this.set('message', null);
  },

  actions: {
    addMessage() {
      let { message } = this.getProperties('message');
      this.reset();

      this.get('store').dispatch({
        op: 'addMessage',
        conversationId: 'lobby',
        body: message
      });
    }
  }
});
