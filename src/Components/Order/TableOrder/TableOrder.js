import React from 'react';
import './TableOrder.modules.scss';
import { useTable } from 'react-table';


export const TableOrder = ({ columns, data, className }) => {
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
    <> 
      <table className={`${className} `} {...getTableProps()}>
        <thead >
          {headerGroups.map((headerGroup) => (
            <tr  {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th  {...column.getHeaderProps()}>
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
                    <td  {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

 