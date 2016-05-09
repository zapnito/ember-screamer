import Phoenix from 'npm:phoenix';

export function initialize(application) {
  application.inject('component', 'router', 'router:main');
}

export default {
  name: 'router',
  initialize
};
