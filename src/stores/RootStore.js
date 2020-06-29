import { types as t } from 'mobx-state-tree';

import AuthStore from './AuthStore';
import UsersStore from './UsersStore';
import OrdersStore from './OrdersStore';

const RootStore = t
  .model('RootStore', {
    auth: t.optional(AuthStore, {}),
    users: t.optional(UsersStore, {}),
    orders: t.optional(OrdersStore, {}),
  })
  .actions((store) => ({
    clearStore() {
      store = {};
    },
  }));

export default RootStore;
