import conversations from './conversations';

const reducers = [
  conversations
];

export default function reduce(state, operation) {
  return reducers.reduce((state, reduction) => reduction(state, operation), state);
}
