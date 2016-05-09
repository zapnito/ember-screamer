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

    if (!this._channels[topic]) {
      let channel = new Channel(socket, topic, store, ops);
      this._channels[topic] = channel;
      return channel.join();
    }
    else {
      return Ember.RSVP.resolve();
    }
  },

  dispatch(topic, action) {
    let channel = this._channels[topic];

    if (!channel) {
      throw new Error('Topic not subscribed to: ${topic}');
    }

    channel.dispatch(action);
  }
});
