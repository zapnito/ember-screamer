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

function joinConversationsIndex(state, operation) {
  if (!operation.payload) return state;

  let conversations = operation.payload.reduce((conversations, conversation) => {
    conversations[conversation.id] = conversation;
    return conversations;
  }, {});

  return state.mergeDeep({ conversations });
}

function addConversation(state, operation) {
  return state.mergeDeep({
    conversations: {
      [operation.id]: {
        id: operation.id,
        name: operation.name
      }
    }
  });
}

export default function reduce(state, operation) {
  let { op, status, topic } = operation;
  if (!topic.match(/^conversations/)) return state;

  console.log('operationz', operation);
  if (topic === 'conversations:index' && op === 'join') return joinConversationsIndex(state, operation);
  if (topic === 'conversations:index' && op === 'addConversation') return addConversation(state, operation);

  let conversationId = operation.topic.split(':')[1];

  if (op === 'addMessage') return addMessage(state, conversationId, operation);
  if (op === 'join' && status === 'requested') return joinConversationRequested(state, conversationId);
  if (op === 'join' && status === 'succeeded') return joinConversation(state, conversationId, operation);
  return state;
}
