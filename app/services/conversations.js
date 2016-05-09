import Ember from 'ember';
import uuid from 'npm:node-uuid';

export default Ember.Service.extend({
  channels: Ember.inject.service(),

  add(name) {
    let topic = `conversations:index`;
    let conversation = { op: 'addConversation', id: uuid.v4(), name };

    this.get('channels').dispatch(topic, conversation);

    return conversation.id;
  },

  addMesage(conversationId, body) {
    let topic = `conversations:${conversationId}`;
    let message = { op: 'addMessage', id: uuid.v4(), body };

    this.get('channels').dispatch(topic, message);
  }
});
