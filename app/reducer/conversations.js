import Message from 'ember-screamer/models/message';

function updateInMessages(messages, message) {
  let index = messages.findIndex(candidate => candidate.id === message.id);

  if (index !== -1) {
    return messages.update(index, () => message);
  } else {
    return messages.push(message);
  }
}

const reducers = {
  addMessageRequested(state, { op, topic, id, body, status }) {
    let conversationId = topic.split(":")[1];
    let path = ['conversations', conversationId, 'messages'];
    let message = { id, body, status};

    return state.updateIn(path, messages => updateInMessages(messages, message));
  }
}

export default function (state, operation) {
  if (!operation.topic.match(/^conversations/)) return state;

  switch (operation.op) {
    case 'addMessage': return reducers.addMessageRequested(state, operation);
    default: return state;
  }
};
