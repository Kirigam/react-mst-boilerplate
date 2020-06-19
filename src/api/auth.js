import { apiRequest } from './utils';
import { isUnauthorizedError } from './utils';
import storageService from '../utils/storageService';

const setUserToStorage = ({ data: { key, user } }) => {
  console.log(key);

  // storageService.set('token', key);
  storageService.set('userId', user.id);
  window.localStorage.setItem('user_info', JSON.stringify(user));

  return user;
};

export const login = ({ email, password }) =>{
  return apiRequest({
    method: 'POST',
    url: 'https://puz.supply/api/dj-rest-auth/login/',
    data: { email, password },
  })
}
 
    // .then((response) => {
    //   // (response);
    //   return response;
    // })
    // .catch((error) => {
    //   return error.response.data;
    // });
export const getUser = ({ id }) =>{
  return  apiRequest({
    method: 'GET',
    url: `https://puz.supply/api/project_users/${id}/`
  })
}
  // apiRequest({
  //   method: 'GET',
  //   url: `https://puz.supply/api/project_users/${id}/`
  //     .then((response) => {
  //       setUserToStorage(response);
  //       return response;
  //     })
  //     .catch((error) => {
  //       return error.response.data;
  //     }),
  // });
export const registration = (data) =>
  apiRequest({
    method: 'POST',
    url: 'https://puz.supply/api/dj-rest-auth/registration/',
    data,
  })
    .then((response) => {
      setUserToStorage(response);
      return response;
    })
    .catch((error) => {
      return error.response.data;
    });

export const restorePassword = (data) =>
  apiRequest({
    method: 'POST',
    url: '/auth/restore-password',
    data,
  }).then(setUserToStorage);

export const Users = {
  // __IdUsers: null,
  get(id) {
    return apiRequest({
      method: 'GET',
      url: `https://puz.supply/api/project_users/${id}/`,
    })
      
  },
};

export const Order = {
  getDirections(){
    return apiRequest({
      method: 'GET',
      url: `https://puz.supply/api/directions/`,
    })
  },
  createOrder(){
    return apiRequest({
      method: 'POST',
      url: `https://puz.supply//api/ordered_nomenclatures/`,
      data:{
        client_id:'11',
        product:[
         {
          nomenclature_id:'1',
          date:'12.02.2020',
          amount:'12',
          price:'500',
         }
        ],
        order_id:'21'
      }
    })
  }
}