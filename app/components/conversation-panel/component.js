import Ember from 'ember';

export default Ember.Component.extend({
  state: Ember.inject.service('state'),
  conversation: null,

  reset() {
    this.set('message', null);
  },

  actions: {
    addMessage() {
      let { message } = this.getProperties('message');
      this.reset();

      this.get('state').dispatch({
        op: 'addMessage',
        conversationId: 'lobby',
        message
      });
    }
  }
});
