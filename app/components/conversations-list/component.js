import Ember from 'ember';
import uuid from 'npm:node-uuid';

export default Ember.Component.extend({
  conversations: null,
  channels: Ember.inject.service('channels'),

  reset() {
    this.set('name', null);
  },

  actions: {
    addConversation() {
      let { name } = this.getProperties('name');
      let topic = `conversations:index`;
      let conversation = { op: 'addConversation', id: uuid.v4(), name };
      console.log({conversation});

      this.reset();
      this.get('channels').dispatch(topic, conversation);
    }
  }
})
