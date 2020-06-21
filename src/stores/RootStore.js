import { types as t } from 'mobx-state-tree';

import UsersStore from './usersStore';
import DirectionsStore from './DirectionsStore';

const RootStore = t.model('RootStore', {
  users: t.optional(UsersStore, {}),
  directions: t.optional(DirectionsStore, {}),
});

export default RootStore;
