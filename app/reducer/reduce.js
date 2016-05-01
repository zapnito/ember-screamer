import conversations from './conversations';

const reducers = [
  conversations
];

export default async function reduce(state, operation) {
  return await reducers.reduce((updateState, reduction) => {
    return Ember.RSVP.resolve(updateState).then(state => reduction(state, operation));
  }, state);
}
