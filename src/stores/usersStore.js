import { propOr, prop } from 'ramda';
import { types as t, flow, getSnapshot } from 'mobx-state-tree';
import storageService from '../utils/storageService';
import UserModel from './modeles/UserModel';

import { registration, login, getUser } from '../Api/auth.js';
import { NameStorage } from '../Constants/Index';
import * as Api from '../Api';
import { Snackbar } from '@material-ui/core';

const UsersStore = t
  .model('UserStore', {
    list: t.optional(t.array(UserModel), []),
  })
  .actions((store) => ({
    addUser(user) {
      user.id = user.id.toString();

      store.list.unshift(user);
      console.log(store);
    },
    removeUser() {
      store.list = [];
    },
    register: flow(function* (data) {
      try {
        let res = yield registration(data);
        store.addUser(res.data.user);
        storageService.set(NameStorage.USERID, res.data.user.id);
        storageService.set(NameStorage.USERTOKEN, res.data.key);
        storageService.set(
          NameStorage.USERINFO,
          JSON.stringify(res.data.user),
        );
        return res;
      } catch (error) {
        return error.response.data;
      }
    }),
    login: flow(function* (data) {
      try {
        const res = yield Api.login(data);
        store.addUser(res.data.user);
        storageService.set(NameStorage.USERID, res.data.user.id);
        storageService.set(NameStorage.USERTOKEN, res.data.key);
        storageService.set(
          NameStorage.USERINFO,
          JSON.stringify(res.data.user),
        );
        return res;
      } catch (error) {
        return error.response.data;
      }
    }),
    fetchUser: flow(function* (userID) {
      try {
        const res = yield Api.getUser(userID);

        store.addUser(res.data.user);
      } catch (error) {
        console.log(error);
        return error.response.data;
      }
    }),
  }))
  .views((store) => ({
    get authUser() {
      const userId = storageService.get('userId');
      const allUsers = propOr([], 'list', store);
      console.log(allUsers);
      console.log(userId);
      allUsers.find((item) => {
         console.log( item);
         
      }) 
      

      return allUsers.find(({ id }) => id == userId);
    },
  }));

export default UsersStore;
