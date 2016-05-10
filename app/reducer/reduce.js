import conversations from './conversations';

const reducers = [
  conversations
];

export default function reduce(state = {}, action) {
  return {
    conversations: conversations(state.conversations, action)
  }
}
