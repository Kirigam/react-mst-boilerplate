import { apiRequest } from './utils';
import { isUnauthorizedError } from './utils';
import storageService from '../utils/storageService';

const setUserToStorage = ({ data: { key, user } }) => {
  storageService.set('userId', user.id);
  storageService.set('user_info', JSON.stringify(user));
  return user;
};

export const login = ({ email, password }) => {
  return apiRequest({
    method: 'POST',
    url: 'https://puz.supply/api/dj-rest-auth/login/',
    data: { email, password },
  });
};
export const getUser = (id) => {
  return apiRequest({
    method: 'GET',
    url: `https://puz.supply/api/project_users/${id}/`,
  });
};
export const registration = (data) => {
  return apiRequest({
    method: 'POST',
    url: 'https://puz.supply/api/dj-rest-auth/registration/',
    data,
  });
};

export const restorePassword = (data) => {
  return apiRequest({
    method: 'POST',
    url: '/auth/restore-password',
    data,
  });
};
 
// export const Order = {
//   getDirections() {
//     return apiRequest({
//       method: 'GET',
//       url: `https://puz.supply/api/directions/`,
//     });
//   },
//   createOrder() {
//     return apiRequest({
//       method: 'POST',
//       url: `https://puz.supply//api/ordered_nomenclatures/`,
//       data: {
//         client_id: '11',
//         product: [
//           {
//             nomenclature_id: '1',
//             date: '12.02.2020',
//             amount: '12',
//             price: '500',
//           },
//         ],
//         order_id: '21',
//       },
//     });
//   },
// };
