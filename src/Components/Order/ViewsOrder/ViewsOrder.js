import React, { useState, useEffect } from 'react';
import s from './ViewsOrder.module.scss';
import {
  Box,
  Typography,
  Button,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  Table,
  IconButton,
  Avatar,
} from '@material-ui/core';
import { TableOrder } from '../TableOrder/TableOrder';
import storageService from '../../../utils/storageService';
import {
  NameStorage,
  PrivateRoute,
  OrderStatut,
} from '../../../Constants/Index';
import { Link } from 'react-router-dom';
import * as Api from '../../../Api';
import { Loader } from '../../Loader/Loader';
import { useTable } from 'react-table';
import { SetingsSVG } from '../../../assetc/svg/setings';
import { ArrowDown } from '../../../assetc/svg/arrowDown';
import { ArrowLeft } from '../../../assetc/svg/arrowLeft';
import { MainTablet } from '../MainTablet/MainTablet';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

export const ViewsOrder = () => {
  //   const s = useStyles();
  const [viewsOrders, setViewsOrders] = useState({
    isLoading: false,
    allOrders: [],
    Orders: [],
  });
  const countOrder = Number(storageService.get(NameStorage.USERORDE));

  const userId = Number(storageService.get(NameStorage.USERID));

  useEffect(() => {
    const userID = storageService.get(NameStorage.USERID);

    Promise.resolve(Api.allOrderUsers(userID))
      .then((result) => {
        console.log(result.data.results);

        const temsArray = [];
        const tableData = [];
        result.data.results.map((item) => {
          let dataTemp = { header: {}, main: [] };
          let increment = 1;
          let flag = true;

          item.ordered_nomenclatures.map((product) => {
            let tempObject = {
              idNomenclature: flag ? item.id : '',
              idproduct: increment,
              manager: product.nomenclature.manager.full_name,
              direction: product.nomenclature.direction.name,
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
          console.log(tableData);
          tableData.push(dataTemp);
        });

        storageService.set(
          NameStorage.USERORDE,
          result.data.results.length,
        );
        setViewsOrders({
          ...viewsOrders,
          isLoading: true,
          allOrders: temsArray,
          Orders: tableData,
        });
        return result;
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      {viewsOrders.isLoading && (
        <>
          {countOrder == 0 && (
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
                <Link to={PrivateRoute.CREATEORDER}>
                  <Button className={s.btn_standart}>
                    Безкоштовне замовлення
                  </Button>
                </Link>
              </Box>
            </Box>
          )}

          {countOrder > 0 && (
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
