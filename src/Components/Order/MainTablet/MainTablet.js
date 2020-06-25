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
} from '@material-ui/core';
import { ArrowLeft } from '../../../assetc/svg/arrowLeft';
import { ArrowDown } from '../../../assetc/svg/arrowDown';

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
              {item.header.status === 'valuating'
                ? 'Розглядається'
                : ''}
              {item.header.status === 'unordered'
                ? 'Незавершене'
                : ''}
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
