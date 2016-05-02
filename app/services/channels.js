import Ember from 'ember';
import Channel from 'ember-screamer/lib/channel';

const { service } = Ember.inject;

export default Ember.Service.extend({
  store: service('store'),
  socket: service('socket'),

  init() {
    this._super();
    this._channels = {};
  },

  join(topic, ops) {
    let { socket, store } = this.getProperties('socket', 'store');
    this._channels[topic] = new Channel(socket, topic, store, ops);
  },

  dispatch(topic, operation) {
    let channel = this._channels[topic];

    if (!channel) {
      throw new Error('Topic not subscribed to: ${topic}');
    }

    channel.dispatch(operation);
  }
});
