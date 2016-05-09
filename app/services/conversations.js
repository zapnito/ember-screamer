import Ember from 'ember';
import uuid from 'npm:node-uuid';

export default Ember.Service.extend({
  channels: Ember.inject.service(),
  store: Ember.inject.service(),

  subscribeToList() {
    return this.get('channels').join('conversations:index', ['addConversation']);
  },

  subscribeToConversation(conversationId) {
    let topic = `conversations:${conversationId}`;
    return this.get('channels').join(topic, ['addMessage']);
  },

  getConversation(conversationId) {
    return this.get('store').subscribe(state => {
      return state.getIn(['conversations', conversationId]).toJS();
    });
  },

  getList() {
    return this.get('store').subscribeToArray(state => {
      return state.get('conversations').toIndexedSeq().sortBy(c => c.get('name')).toJS();
    });
  },

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
