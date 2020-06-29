import React from 'react';
import './TableOrder.modules.scss';
import { useTable } from 'react-table';
import { Avatar, Popover, Typography } from '@material-ui/core';
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

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

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
                          <Typography
                            className="linkManager"
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}
                          >
                            {cell.render('Cell')}
                          </Typography>
                        </div>
                        {/* <div> */}
                          {/* <Popover
                            // id="mouse-over-popover"
                            // className={classes.popover}
                            // classes={{
                            //   paper: classes.paper,
                            // }}
                            open={open}
                            // anchorEl={anchorEl}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'left',
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                            }}
                            onClose={handlePopoverClose}
                            disableRestoreFocus
                          >
                            <Typography>I use Popover.</Typography>
                          </Popover> */}
                          {/* <CardManager></CardManager> */}
                        {/* </div> */}
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
