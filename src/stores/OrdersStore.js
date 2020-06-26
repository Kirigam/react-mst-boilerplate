import { propOr } from 'ramda';
import { types as t, flow, getSnapshot } from 'mobx-state-tree';
import storageService from '../utils/storageService';
import UserModel from './modeles/UserModel';

import { registration } from '../Api/auth.js';
import { NameStorage } from '../Constants/Index';
import * as Api from '../Api';
import OrderModel from './modeles/OrderModel';

const OrdersStore = t
  .model('OrdersStore', {
    list: t.optional(t.array(OrderModel), []),
  })
  .actions((store) => ({
    addOrder(Ordres) {
      // console.log(Ordres );
      const tempArray = {
        id: null,
        status: null,
        ordered_nomenclatures: [],
      };

      Ordres.map((item) => {
        
        tempArray.id = Number(item.id);
        tempArray.status = item.status;

        item.ordered_nomenclatures.map((orderedNomenclature) => {
          const tempArrayOrderedNomenclature = {};
            tempArrayOrderedNomenclature.id = orderedNomenclature.id;
            tempArrayOrderedNomenclature.address = orderedNomenclature.address;
            tempArrayOrderedNomenclature.amount = orderedNomenclature.amount;
            tempArrayOrderedNomenclature.date = orderedNomenclature.date;
            tempArrayOrderedNomenclature.price = orderedNomenclature.price;

            tempArrayOrderedNomenclature.nomenclature={
                name:orderedNomenclature.nomenclature.name,
                code:orderedNomenclature.nomenclature.code
            }

            tempArrayOrderedNomenclature.manager={
                id: orderedNomenclature.nomenclature.manager.id,
                name: orderedNomenclature.nomenclature.manager.full_name,
                phone: orderedNomenclature.phone_number,
                eamil: orderedNomenclature.email,
            }

            tempArrayOrderedNomenclature.unit={
                id: orderedNomenclature.nomenclature.unit.id,
                name: orderedNomenclature.nomenclature.unit.name,
            }

          tempArray.ordered_nomenclatures.push(
            tempArrayOrderedNomenclature,
          );
        });
      });

      console.log(getSnapshot(store.list));

    },
    removeOrder() {
      //     store.list = [];
    },
    fetchOrders: flow(function* (userID) {
      try {
        
        const res = yield Api.fetchOrderUser(userID);
        store.addOrder(res.data.results);

      } catch (error) {
        console.log(error);
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

export default OrdersStore;
