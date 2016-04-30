import Ember from 'ember';

export default Ember.Component.extend({
  state: Ember.inject.service('state'),
  conversation: null,

  actions: {
    addMessage() {
      let { message } = this.getProperties('message');
      this.set('message', null);
      this.get('state').dispatch('addMessage', message, 'lobby');
    }
  }
});
