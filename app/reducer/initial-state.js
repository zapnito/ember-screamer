import Immutable from 'npm:immutable';

export default function initialState() {
  return Immutable.fromJS({
    conversations: {
      'eecf4c2b-f6e5-3ae3-bef7-1ea09f91d3e7': {
        id: 'eecf4c2b-f6e5-3ae3-bef7-1ea09f91d3e7',
        name: 'Lobby',
        status: 'pending',
        messages: []
      }
    }
  });
}
