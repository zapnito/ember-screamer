import Ember from 'ember';
import uuid from 'npm:node-uuid';

export default Ember.Component.extend({
  channels: Ember.inject.service('channels'),
  conversation: null,
  loading: Ember.computed('conversation.status', function() {
    return this.get('conversation.status') !== 'succeeded';
  }),

  reset() {
    this.set('message', null);
  },

  actions: {
    addMessage() {
      let { message, conversation } = this.getProperties('message', 'conversation');
      this.reset();
      this.get('channels').dispatch(`conversations:${conversation.get('id')}`, { op: 'addMessage', id: uuid.v4(), body: message });
    }
  }
});
