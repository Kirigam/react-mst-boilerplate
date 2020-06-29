import { propOr } from 'ramda';
import { types as t, flow } from 'mobx-state-tree';
import storageService from '../utils/storageService';
import UserModel from './modeles/UserModel';

import localStorageKeys from '../constants/localStorageKeys';
import * as Api from '../api';

const UsersStore = t
  .model('UserStore', {
    list: t.optional(t.array(UserModel), []),
  })
  .actions((store) => ({
    addUser(user) {
      store.list.unshift(user);
    },
    fetchUser: flow(function* (userID) {
      try {
        const res = yield Api.getUser(userID);

        store.addUser(res.data.user);
        return res;
      } catch (error) {
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

        storageService.set(localStorageKeys.USER_ID, res.data.user.id);
        console.log('4');

        storageService.set(localStorageKeys.ACCESS_TOKEN, res.data.key);
        console.log('5');

        storageService.set(
          localStorageKeys.USER_INFO,
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
  }));

export default UsersStore;
