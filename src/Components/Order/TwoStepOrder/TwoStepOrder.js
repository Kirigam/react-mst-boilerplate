import React, { useEffect, useContext } from 'react';
import s from './twoStepOrder.module.scss';
import { Box, Typography, Button } from '@material-ui/core';
import { useTable } from 'react-table';
import { useStore } from '../../../stores/stores';
import CreateInfoOrder from '../CreateOrder/CreateInfoOrderContext';

export const TwoStepOrder = ({ ...props }) => {
  const { directions, nomenclature, newOrder , manager } = useContext(
    CreateInfoOrder,
  );

  console.log(newOrder );
  

  const columns = React.useMemo(
    () => [
      {
        Header: '#',
        accessor: 'idNomenclature', // accessor is the "key" in the data
      },
      {
        Header: 'Менеджео',
        accessor: 'manager',
      },
      {
        Header: 'Напрям',
        accessor: 'direction',
      },
      {
        Header: 'Номенклатура',
        accessor: 'nomenclature',
      },
      {
        Header: 'К-сть',
        accessor: 'Count',
      },
      {
        Header: 'Дата',
        accessor: 'date',
      },
      {
        Header: 'Адреса',
        accessor: 'address',
      },
      {
        Header: 'Дія',
        accessor: 'Action',
      },
    ],
    [],
  );
  const data = React.useMemo(
    () => [
      {
        idNomenclature: 1,
        manager: 'Миколенко М.В.',
        direction:
          'Централізована закупівля виробів для забезпечення умов ',
        nomenclature: 'Товар 1 ',
        Count: '5 шт.',
        date: '17.02.2020',
        address: 'м. Тернопіль, С.Будного 32 А',
      },
      {
        idNomenclature: 2,
        manager: 'Миколенко М.В.',
        direction:
          'Централізована закупівля виробів для забезпечення умов ',
        nomenclature: 'Товар 1 ',
        Count: '5 шт.',
        date: '17.02.2020',
        address: 'м. Тернопіль, С.Будного 32 А',
      },
    ],
    [],
  );

  return (
    <>
      <Box>
        <Button
          // onClick={handleOpen}
          variant="outlined"
          style={{ fontWeight: '600', margin: '30px 0px' }}
        >
          Додати номенклатуру
        </Button>
      </Box>
      <Box>
        <Typography variant="h5" className={s.SubMainTitle}>
          Товари для розцінки
        </Typography>
      </Box>
      <Table columns={columns} data={data} />
    </>
  );
};

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  // console.log(getTableProps)

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          // console.log(...headerGroup.getHeaderGroupProps() );
          // console.log()

          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
