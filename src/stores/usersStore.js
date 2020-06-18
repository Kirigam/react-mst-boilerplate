import { propOr } from 'ramda';
import { types as t } from 'mobx-state-tree';
import storageService from '../utils/storageService';
import UserModel from './modeles/UserModel';

import { registration } from '../Api/auth.js';

const UsersStore = t
  .model('UserStore', {
    user: t.maybe(UserModel, {}),

    isLoading: t.optional(t.boolean, false),
    isLoggedIn: t.optional(t.boolean, false),
  })
  .actions((store) => ({
    addUser(user) {
      store.items.unshift(user);
    },
    setUser(user) {
      store.user = user;
    },
    register(data) {
      store.isLoading = true;
      let result = registration(data);

      store.isLoading = false;
      store.isLoggedIn = true;

      return result;
    },
  }))
  .views((store) => ({
    get authUser() {
      const userId = storageService.get('userId');
      const allUsers = propOr([], ['users', 'list'], store);

      return allUsers.find(({ id }) => id === userId);
    },
  }));

export default UsersStore;
