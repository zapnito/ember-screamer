import Ember from 'ember';
import uuid from 'npm:node-uuid';

export default Ember.Component.extend({
  channels: Ember.inject.service('channels'),
  conversation: null,
  loading: Ember.computed('conversation.status', function() {
    return this.get('conversation.status') !== 'succeeded';
  }),

  reset() {
    this.set('body', null);
  },

  actions: {
    addMessage() {
      let { body, conversation } = this.getProperties('body', 'conversation');
      let topic = `conversations:${conversation.get('id')}`;
      let message = { op: 'addMessage', id: uuid.v4(), body };

      this.reset();

      this.get('channels').dispatch(topic, message);
    }
  }
});
