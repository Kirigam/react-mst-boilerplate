import { propOr } from 'ramda';
import { types as t } from 'mobx-state-tree';

import storageService from '../utils/storageService';

import UserModel from './modeles/UserModel';

const UsersStore = t
  .model('UserStore', {
    items: t.array(UserModel),
    isLoading: t.optional(t.boolean, false),
  })
  .views((store) => ({
    get authUser() {
      const userId = storageService.get('userId');
      const allUsers = propOr([], ['users', 'list'], store);

      return allUsers.find(({ id }) => id === userId);
    },
  }));

export default UsersStore;
