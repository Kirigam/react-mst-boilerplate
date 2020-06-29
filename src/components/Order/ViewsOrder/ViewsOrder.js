import React, { useState, useEffect } from 'react';
import s from './ViewsOrder.module.scss';
import {
  Box,
  Typography,
  Button,
} from '@material-ui/core';
import storageService from '../../../utils/storageService';
import { privateRoutes } from '../../../constants/routes';
import localStorageKeys from '../../../constants/localStorageKeys';
import { Link } from 'react-router-dom';
import * as Api from '../../../api';
import { MainTablet } from '../MainTablet/MainTablet';

import { useStore } from '../../../stores/stores';
import { propOr } from 'ramda';

// function serializeNomenclature({object}) {
//   {item,product,flag} = object;

// }

export const ViewsOrder = () => {
  const { users } = useStore();
  const AuthUser = users.authUser;

  const [viewsOrders, setViewsOrders] = useState({
    isLoading: false,
    Orders: [],
  });

  useEffect(() => {
    console.log('12' );

    const userID = storageService.get(localStorageKeys.USER_ID);

    Promise.resolve(Api.allOrderUsers(userID))
      .then((result) => {
        console.log(result);

        const tableData = [];
        result.data.results.map((item) => {
          let dataTemp = {idOrder:'', header: {}, main: [] };
          let increment = 1;
          let flag = true;
          dataTemp.idOrder=item.id;
          item.ordered_nomenclatures.map((product) => {
            let tempObject = {
              
              idNomenclature: flag ? item.id : '',
              idproduct: increment,
              manager: product.nomenclature.manager.full_name,
              direction: propOr(
                '',
                ['nomenclature', 'direction', 'name'],
                product,
              ),
              nomenclature: product.nomenclature.name,
              Count: `${product.amount} (${product.nomenclature.unit.name})`,
              date: product.date,
              address: product.address,
              status: flag ? item.status : '',
            };

            if (flag) {
              dataTemp.header = tempObject;
            } else {
              dataTemp.main.push(tempObject);
            }

            increment++;
            flag = false;
          });
          tableData.push(dataTemp);
        });

        setViewsOrders({
          isLoading: true,
          Orders: tableData,
          
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
 

  return (
    <>
     {console.log('das')}
     {console.log(AuthUser.client_profile.company)}
      {viewsOrders.isLoading && (
        <>
          {AuthUser.client_profile.has_free_order  && (
            <Box my={6} mx={4}>
              <Typography className={s.MainTitle} variant="h4">
                Оформлення замовлення
              </Typography>
              <Box my={2} mb={6} maxWidth="600px">
                <Typography className={s.MainTitle} variant="h6">
                  У вас є можливість створити одне безкоштовне
                  замовлення. Бажаєте його використати?
                </Typography>
              </Box>

              <Box>
                <Link to={privateRoutes.CREATE_ORDER}>
                  <Button className={s.btn_standart}>
                    Безкоштовне замовлення
                  </Button>
                </Link>
              </Box>
            </Box>
          )}

          {!AuthUser.client_profile.has_free_order && (
            <Box my={6} mx={4}>
              <Typography className={s.MainTitle} variant="h4">
                Активні замовлення
              </Typography>
              <Box className={s.tableWrap}>
                <Box className={s.tableBox}>
                  <MainTablet
                    column={1}
                    dataAll={viewsOrders.allOrders}
                    data={viewsOrders.Orders}
                  ></MainTablet>
                </Box>
              </Box>
            </Box>
          )}
        </>
      )}
    </>
  );
};
