import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this.transitionTo('conversation', 'eecf4c2b-f6e5-3ae3-bef7-1ea09f91d3e7');
  }
});
