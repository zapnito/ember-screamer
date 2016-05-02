import Immutable from 'npm:immutable';

export default function initialState() {
  return Immutable.fromJS({
    conversations: {
      lobby: {
        id: 'lobby',
        name: 'Lobby',
        status: 'pending',
        messages: []
      }
    }
  });
}
