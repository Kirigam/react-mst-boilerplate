import { propOr } from 'ramda';
import { types as t, flow } from 'mobx-state-tree';
import storageService from '../utils/storageService';
import UserModel from './modeles/UserModel';

import { registration } from '../Api/auth.js';
import { NameStorage } from '../Constants/Index';
import * as Api from '../Api';

const UsersStore = t
  .model('UserStore', {
    list: t.optional(t.array(UserModel), []),
  })
  .actions((store) => ({
    addUser(user) {
      console.log(user);
      user.client_profile = null;
      user.is_superuser = null;
      user.manager_profile = null;
      user.phone_number = null;
      user.photo = null;
      user.role = null;

      user.id = user.id.toString();
      console.log(user);

      // user.client_profile.company.concluded=null
      // user.client_profile.company.edrpou=null
      // user.client_profile.company.id=null
      // user.client_profile.company.name=null
      // user.client_profile.company=null
      // user.client_profile=null
      // user.client_profile.id=null
      // user.client_profile.has_free_order=null
      // user.client_profile.full_name=null
      // user.client_profile.address=null
      // console.log(store.list );

      store.list.unshift(user);
      // console.log(store);
    },
    removeUser() {
      store.list = [];
    },
    register: flow(function* (data) {
      try {
        let res = yield registration(data);
        console.log(res.data.user);
        store.addUser(res.data.user);
        console.log(store);

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
        console.log(error);

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
      return allUsers.find(({ id }) => id == userId);
    },
    // get clientProfileId() {
    //   const userId = storageService.get('userId');
    //   const allUsers = propOr([], 'list', store);
    //   const authUser = allUsers.find(({ id }) => id == userId);

    //   // console.log(authUser );

    //   return authUser;
    // },
  }));

export default UsersStore;
