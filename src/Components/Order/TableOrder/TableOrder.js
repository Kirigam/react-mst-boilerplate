import React from 'react';
import './TableOrder.modules.scss';
import { useTable } from 'react-table';
import { Avatar } from '@material-ui/core';
import { CardManager } from '../CardManager/CardManager';

export const TableOrder = ({ columns, data, className }) => {
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

  console.log(data);

  return (
    <>
      <table className={`${className} `} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
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
            // console.log(row.column );

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  if (cell.column.id == 'manager') {
                    return (
                      <td {...cell.getCellProps()}>
                        <div className="managerBox">
                          <Avatar className="avatarManager"></Avatar>
                          <div className="linkManager">
                            {cell.render('Cell')}
                          </div>
                        </div>
                        <div>
                          {/* <CardManager></CardManager> */}
                        </div>
                      </td>
                    );
                  } else {
                    return (
                      <td {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    );
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
