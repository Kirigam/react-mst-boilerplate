import { types as t } from 'mobx-state-tree';

import UsersStore from './usersStore';

const RootStore = t.model('RootStore', {
  users: t.optional(UsersStore, {}),
});

export default RootStore;
