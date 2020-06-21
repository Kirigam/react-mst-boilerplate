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

export const createOrder = () => {
  return apiRequest({
    method: 'POST',
    url: `https://puz.supply//api/ordered_nomenclatures/`,
    data: {
      client_id: '11',
      product: [
        {
          nomenclature_id: '1',
          date: '12.02.2020',
          amount: '12',
          price: '500',
        },
      ],
      order_id: '21',
    },
  });
};
