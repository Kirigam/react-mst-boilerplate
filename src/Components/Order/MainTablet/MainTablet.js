import React from 'react';
import s from './MainTablet.module.scss';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  Box,
  Avatar,
  IconButton,
  TableBody,
  TableFooter,
  Button,
} from '@material-ui/core';
import { ArrowLeft } from '../../../assetc/svg/arrowLeft';
import { ArrowDown } from '../../../assetc/svg/arrowDown';
import { useHistory } from 'react-router-dom';
import { PrivateRoute } from '../../../Constants/Index';
import storageService from '../../../utils/storageService';

export const MainTablet = ({ ...props }) => {
  const { dataAll, data } = props;

  return (
    <Table className={s.table}>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>#ID</TableCell>
          <TableCell></TableCell>
          <TableCell>Менеджер</TableCell>
          <TableCell>Напрям</TableCell>
          <TableCell>Номенклатура</TableCell>
          <TableCell>К-сть</TableCell>
          <TableCell>Дата</TableCell>
          <TableCell>Адреса</TableCell>
          <TableCell>Статус</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item, i) => {
          return (
            //   <MuiTableContainer>
            <ExpandableTableRow 
              key={i}
              className={(i & 1) != 0 ? `${s.tableRow}` : null}
              data={item.main}
              orderID={item.idOrder}
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
                {item.header.status === 'valuating'
                  ? 'Розглядається'
                  : ''}
                {item.header.status === 'unordered' ? 'Чернетка' : ''}
              </TableCell>
            </ExpandableTableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

const ExpandableTableRow = ({ children, ...props }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const { orderID, data, className } = props;
  let history = useHistory();
 

  function continueOrder() {
    storageService.set('continueOrderID', orderID);
    history.push(PrivateRoute.CREATEORDER);
  }

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
          {data.map((item,key) => (
            <TableRow key={key} className={className}>
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
      <TableRow>
        {/* <TableCell className={s.foterInfoBox} colSpan="10">
          <div className={s.foterInfoLine}>
            <div className={s.foterInfoText}>
              У вас залишилось незавершене замовлення. Продовжіть
              роботу або видаліть його.
            </div>
            <Button className={s.btn_delete}>Видалити</Button>
            <Button
              onClick={continueOrder}
              className={s.btn_continue}
            >
              Продовжити
            </Button>
          </div>
        </TableCell> */}
      </TableRow>
    </>
  );
};
