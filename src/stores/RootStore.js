import { types as t } from 'mobx-state-tree';

import UsersStore from './usersStore';
import DirectionsStore from './DirectionsStore';
import OrdersStore from './OrdersStore';

const RootStore = t.model('RootStore', {
  users: t.optional(UsersStore, {}),
  // directions: t.optional(DirectionsStore, {}),
  orders:t.optional(OrdersStore,{})
});

export default RootStore;
