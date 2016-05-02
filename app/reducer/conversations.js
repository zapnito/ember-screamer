import Message from 'ember-screamer/models/message';

function updateInMessages(messages, message) {
  let index = messages.findIndex(candidate => candidate.id === message.id);

  if (index !== -1) {
    return messages.update(index, () => message);
  } else {
    return messages.push(message);
  }
}

function addMessage(state, { op, topic, id, body, status }) {
  let conversationId = topic.split(":")[1];
  let path = ['conversations', conversationId, 'messages'];
  let message = { id, body, status};

  return state.updateIn(path, messages => updateInMessages(messages, message));
}

function joinConversationRequested(state, {topic}) {
  let conversationId = topic.split(":")[1];
  let path = ['conversations', conversationId, 'status'];

  return state.updateIn(path, status => 'requested');
}

function joinConversation(state, { topic, payload }) {
  let conversationId = topic.split(":")[1];
  let path = ['conversations', conversationId];
  return state.mergeDeep({conversations: {[conversationId]: { status: 'succeeded', messages: payload }}});
}

export default function (state, operation) {
  if (!operation.topic.match(/^conversations/)) return state;

  let { op, status } = operation;
  console.log({operation});

  if (op === 'addMessage') return addMessage(state, operation);
  if (op === 'join' && status === 'requested') return joinConversationRequested(state, operation);
  if (op === 'join' && status === 'succeeded') return joinConversation(state, operation);
  return state;
};
