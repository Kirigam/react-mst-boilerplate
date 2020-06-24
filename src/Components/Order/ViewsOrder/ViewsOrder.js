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
          isLoading:true,
          allOrders: temsArray,
          Orders: tableData,
        });
        return result;
      })
      .catch((error) => {
        // console.log(error.response);
        // setisLoading(false);
      });
  }, []);

  return (
    <>{viewsOrders.isLoading && (
        <>
{countOrder == 0 && (
        <Box my={6} mx={4}>
          <Typography className={s.MainTitle} variant="h4">
            Оформлення замовлення
          </Typography>
          <Box my={2} mb={6} maxWidth="600px">
            <Typography className={s.MainTitle} variant="h6">
              У вас є можливість створити одне безкоштовне замовлення.
              Бажаєте його використати?
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

export const MainTablet = ({ ...props }) => {
  const { dataAll, data } = props;

  //  const  data1 = Object.entries(data);
  //   console.log(dataAll.map());
  console.log(data);
  return (
    <Table className={s.table}>
      <TableHead>
        <TableRow>
          <TableCell>#ID</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell>Менеджео</TableCell>
          <TableCell>Напрям</TableCell>
          <TableCell>Номенклатура</TableCell>
          <TableCell>К-сть</TableCell>
          <TableCell>Дата</TableCell>
          <TableCell>Адреса</TableCell>
          <TableCell>Статус</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item, i) => (
          //   <MuiTableContainer>
          <ExpandableTableRow
            className={(i & 1) != 0 ? `${s.tableRow}` : null}
            data={item.main}
          >
            <TableCell>{item.header.idNomenclature}</TableCell>
            <TableCell>{item.header.idproduct}</TableCell>
            <TableCell>
              <Box className={s.managerTable}>
                <Avatar className={s.managerTableAvatar}></Avatar>
                {item.header.manager}
              </Box>
            </TableCell>
            <TableCell>{item.header.direction}</TableCell>
            <TableCell>{item.header.nomenclature}</TableCell>
            <TableCell>{item.header.Count}</TableCell>
            <TableCell>{item.header.date}</TableCell>
            <TableCell>{item.header.address}</TableCell>
            <TableCell
              className={`${
                item.header.status === 'valuating' && s.valuating
              } ${s.status}`}
            >
              {item.header.status === 'valuating'? 'Розглядається':''
              }
              {item.header.status === 'unordered'? 'Незавершене':''}
            </TableCell>
          </ExpandableTableRow>
          //   </MuiTableContainer>
        ))}
      </TableBody>
    </Table>
  );
};

const ExpandableTableRow = ({ children, ...props }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const { data, className } = props;
  console.log(data);

  return (
    <>
      <TableRow className={className}>
        <TableCell padding="checkbox">
          {data.length > 0 && (
            <IconButton onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? (
                <ArrowLeft size="24px" />
              ) : (
                <ArrowDown size="24px" />
              )}
            </IconButton>
          )}
        </TableCell>
        {children}
      </TableRow>
      {isExpanded && (
        <>
          {data.map((item) => (
            <TableRow className={className}>
              <TableCell></TableCell>
              <TableCell>{item.idNomenclature}</TableCell>
              <TableCell>{item.idproduct}</TableCell>
              <TableCell>
                <Box className={s.managerTable}>
                  <Avatar className={s.managerTableAvatar}></Avatar>
                  {item.manager}
                </Box>
              </TableCell>
              <TableCell>{item.direction}</TableCell>
              <TableCell>{item.nomenclature}</TableCell>
              <TableCell>{item.Count}</TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          ))}
        </>
      )}
    </>
  );
};
