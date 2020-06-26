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
      user.client_profile.id.toString();
      user.id = user.id.toString();
      store.list.unshift(user);
    },
    updateUser(){

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
         console.log( );
         
        return error.response.data;
      }
    }),
    fetchUser: flow(function* (userID) {
      try {
        const res = yield Api.getUser(userID);

        store.addUser(res.data.user);
        return res;
      } catch (error) {
        console.log(error);
        console.log(error.response);
        return error.response.data;
      }
    }),
    updateUser: flow(function* (userData) {
      try {
        console.log('1');
        // console.log(userData);
        const res = yield Api.updateUser(userData);
        console.log('2');
 

        store.addUser(res.data.user);
        console.log('3');

        storageService.set(NameStorage.USERID, res.data.user.id);
        console.log('4');

        storageService.set(NameStorage.USERTOKEN, res.data.key);
        console.log('5');

        storageService.set(
          NameStorage.USERINFO,
          JSON.stringify(res.data.user),
        );
        return res;
      } catch (error) {
        console.log(error);
        console.log(error.response);
        return error.response.data;
      }
    }),
    changePassword:flow(function* (userData) {
      try {
       console.log(userData );
       const res = yield Api.changePassword(userData);
        
        // const res = store.addUser(userData);
        return res;
      } catch (error) {
        
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
