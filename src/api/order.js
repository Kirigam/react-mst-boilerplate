import { apiRequest } from './utils';

export const getDirections = () => {
  return apiRequest({
    method: 'GET',
    url: `https://puz.supply/api/directions/`,
  });
};
export const getNomenclatures = () => {
  return apiRequest({
    method: 'GET',
    url: `https://puz.supply/api/nomenclatures/`,
  });
};
export const getManagers = () => {
  return apiRequest({
    method: 'GET',
    url: `https://puz.supply/api/managers/`,
  });
};

export const createOrder = (userID) => {
  return apiRequest({
    method: 'POST',
    url: `https://puz.supply/api/orders/`,
    data: { client_profile_id: userID },
    
  });
};
export const addOrderedNomenclatures = (data) => {
  return apiRequest({
    method: 'POST',
    url: `https://puz.supply/api/ordered_nomenclatures/`,
    data:  data,
    
  });
};
