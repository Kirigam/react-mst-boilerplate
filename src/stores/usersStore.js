import { propOr } from 'ramda';
import { types as t } from 'mobx-state-tree';
import storageService from '../utils/storageService';
import UserModel from './modeles/UserModel';

import { registration, login, getUser } from '../Api/auth.js';
import { NameStorage } from '../Constants/Index';
import Api from '../Api';

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
    saveStore() {},
    register(data) {
      store.isLoading = true;
      let result = registration(data);

      store.isLoading = false;
      store.isLoggedIn = true;
      return result;
    },
    login(data) {
      
      store.isLoading = true;
      let result = Api.login(data);
      // console.log(result);

      store.isLoading = false;
      store.isLoggedIn = true;
      return result;
    },
    async GetUsersInfo() {
      try {
        const userID = window.localStorage.getItem('userId');

        if (!!userID) {
          // store.isLoading = true;

          const res = await Api.Users.get(userID);
          console.log(res.data.user);
          // console.log(store );
          // store.user = res.data.user;
          // store.setUser(res.data.user);

          // store.isLoading = false;
          // store.isLoggedIn = true;
        }
      } catch (error) {
        console.log(error);
      }
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
