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
    let store = this.get('store');
    let subscription = Ember.ObjectProxy.create({});

    function update() {
      let conversation = store.getState().conversations.getIn([conversationId]).toJS();
      subscription.set('content', conversation);
    }

    store.subscribe(update);
    update();

    return subscription;
  },

  getList() {
    let store = this.get('store');
    let subscription = Ember.ArrayProxy.create({});

    function update() {
      let newState = store.getState().conversations.toIndexedSeq().sortBy(c => c.get('name')).toJS();
      subscription.set('content', newState);
    }

    store.subscribe(update);
    update();

    return subscription;
  },

  add(name) {
    let topic = `conversations:index`;
    let conversation = { type: 'addConversation', id: uuid.v4(), name };

    this.get('channels').dispatch(topic, conversation);

    return conversation.id;
  },

  addMesage(conversationId, body) {
    let topic = `conversations:${conversationId}`;
    let message = { type: 'addMessage', id: uuid.v4(), body };

    this.get('channels').dispatch(topic, message);
  }
});
