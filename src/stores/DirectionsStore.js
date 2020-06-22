import { propOr } from 'ramda';
import { types as t, flow } from 'mobx-state-tree';
import storageService from '../utils/storageService';
import DirectionsModel from './modeles/DirectionsModel';
 
const DirectionsStore = t
  .model('DirectionsStore', {
    list: t.optional(t.array(DirectionsModel), []),
  })
  .actions((store) => ({
    addDirections(user) {
      user.id = user.id.toString();
      store.list.unshift(user);
    },
    fetchDirections: flow(function* () {
       
    }),
    // removeUser(){
    //   store.list=[];
    // },
    // register: flow(function* (data) {
    //   try {
    //     let res = yield registration(data);
    //     store.addUser(res.data.user);
    //     storageService.set(NameStorage.USERID, res.data.user.id);
    //     storageService.set(NameStorage.USERTOKEN, res.data.key);
    //     storageService.set(
    //       NameStorage.USERINFO,
    //       JSON.stringify(res.data.user),
    //     );
    //     return res;
    //   } catch (error) {
    //     return error.response.data;
    //   }
    // }),
    // login: flow(function* (data) {
    //   try {
    //     const res = yield Api.login(data);
    //     store.addUser(res.data.user);
    //     storageService.set(NameStorage.USERID, res.data.user.id);
    //     storageService.set(NameStorage.USERTOKEN, res.data.key);
    //     storageService.set(
    //       NameStorage.USERINFO,
    //       JSON.stringify(res.data.user),
    //     );
    //     return res;
    //   } catch (error) {
    //     return error.response.data;
    //   }
    // }),
    // fetchUser: flow(function* (userID) {
    //   try {
    //     const res = yield Api.getUser(userID);
    //     store.addUser(res.data.user);
    //   } catch (error) {
    //     console.log(error);
    //     return error.response.data;
    //   }
    // }),
  }))
  .views((store) => ({
    get authUser() {
      const userId = storageService.get('userId');
      const allUsers = propOr([], 'list', store);

      return allUsers.find(({ id }) => id == userId);
    },
  }));

export default DirectionsStore;
