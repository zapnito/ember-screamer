function updateInMessages(messages, message) {
  let index = messages.findIndex(candidate => candidate.id === message.id);

  if (index !== -1) {
    return messages.update(index, () => message);
  } else {
    return messages.push(message);
  }
}

function addMessage(state, conversationId, { op, topic, id, body, status }) {
  let path = ['conversations', conversationId, 'messages'];
  let message = { id, body, status };

  return state.updateIn(path, messages => updateInMessages(messages, message));
}

function joinConversationRequested(state, conversationId) {
  let path = ['conversations', conversationId, 'status'];
  return state.updateIn(path, () => 'requested');
}

function joinConversation(state, conversationId, { topic, payload }) {
  return state.mergeDeep({
    conversations: {
      [conversationId]: {
        status: 'succeeded',
        messages: payload
      }
    }
  });
}

export default function reduce(state, operation) {
  if (!operation.topic.match(/^conversations/)) return state;

  let { op, status } = operation;
  let conversationId = operation.topic.split(':')[1];
  console.log({ operation });

  if (op === 'addMessage') return addMessage(state, conversationId, operation);
  if (op === 'join' && status === 'requested') return joinConversationRequested(state, conversationId);
  if (op === 'join' && status === 'succeeded') return joinConversation(state, conversationId, operation);
  return state;
}
