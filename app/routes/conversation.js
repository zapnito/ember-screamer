import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service('store'),
  channels: Ember.inject.service('channels'),

  model(params) {
    let conversationId = params['conversation_id'];
    let topic = `conversations:${conversationId}`;
    this.get('channels').join(topic, ['addMessage']);
    return this.get('store').subscribe('conversations', conversationId);
  }
});
