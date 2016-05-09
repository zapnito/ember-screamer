import conversations from './conversations';

const reducers = [
  conversations
];

export default function reduce(state, action) {
  return reducers.reduce((state, reduction) => reduction(state, action), state);
}
