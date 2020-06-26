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
export const orderFinishStep = (data) => {
  return apiRequest({
    method: 'POST',
    url: `https://puz.supply/api/order_last_step/`,
    data:  data,
  });
};
export const allOrderUsers = (id) => {
  return apiRequest({
    method: 'GET',
    url: `https://puz.supply/api/orders/?user_id=${id}`,
  });
};
export const getNomenclatureOrder = (id) => {
  console.log(id );
  
  return apiRequest({
    method: 'GET',
    url: `https://puz.supply/api/ordered_nomenclatures/?order_id=${id}`,
  });
};

