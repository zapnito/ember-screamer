const reducers = {
  addMessage(state, { op, conversationId, message }) {
    return state.updateIn(['conversations', conversationId, 'messages'], messages => messages.push(message));
  }
}

export default function (state, operation) {
  return reducers[operation.op] ? reducers[operation.op](state, operation) : state;
};
