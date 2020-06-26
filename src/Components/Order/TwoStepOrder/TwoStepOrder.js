import React, { useEffect, useContext, useState } from 'react';
import s from './twoStepOrder.module.scss';
import {
  Box,
  Typography,
  Button,
  Modal,
  Fade,
} from '@material-ui/core';
import { useTable } from 'react-table';
import { useStore } from '../../../stores/stores';
import CreateInfoOrder from '../CreateOrder/CreateInfoOrderContext';
import { CustomInput } from '../../Form/Elements/input/input';
import { ModalOrder } from '../ModalOrder/ModalOrder';
import { TableOrder } from '../TableOrder/TableOrder';

export const TwoStepOrder = ({ ...props }) => {
  const { directions, nomenclature, newOrder, manager } = useContext(
    CreateInfoOrder,
  );
  // console.log(newOrder );
  
  const { onNomenclature, onDirections, setActiveStep } = props;

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function OrderNomenclature(Orders) {
    const temsArray = [];

    // console.log( );

    Orders.nomenclatures.map((item) => {
      temsArray.push({
        idNomenclature: 1,
        manager: item.nomenclature.nomenclature.name,
        direction: item.nomenclature.direction.name,
        nomenclature: item.nomenclature.name,
        Count: `${item.item} ${item.nomenclature.unit.name}`,
        date: item.date,
        address: item.address,
      });
    });

    return temsArray;
  }

  const defaultData = {
    columns: [
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
    
    ],

    data: [],
  };

  const [dataTable, setDataTable] = useState(defaultData);

  useEffect(() => {
    const temsArray = [];
    let increment = 1;
    newOrder.nomenclatures.map((item) => {
      console.log(item.nomenclature.manager );
      
      temsArray.push({
        idNomenclature: increment,
        manager: item.nomenclature.manager.full_name,
        direction: item.nomenclature.direction != null ? item.nomenclature.direction.name:'',
        nomenclature: item.nomenclature.name,
        Count: `${item.amount} ${item.nomenclature.unit.name}`,
        date: item.date,
        address: item.address,
        manager_info:item.nomenclature.manager,
      });
      increment++;
    });

    setDataTable({
      ...dataTable,
      data: temsArray,
    });
  }, [newOrder]);

  function NextStep() {
    setActiveStep(2);
  }

  return (
    <>
      <Box>
        <Button
          onClick={handleOpen}
          variant="outlined"
          style={{ fontWeight: '600', margin: '12px 0px 32px' }}
        >
          Додати номенклатуру
        </Button>
      </Box>
      <Box>
        <Typography variant="h5" className={s.SubMainTitle}>
          Товари для розцінки
        </Typography>
      </Box>
      <div className="">
        <div className={s.table_wrap}>
          <TableOrder
            className={s.table_box}
            columns={dataTable.columns}
            data={dataTable.data}
          />
        </div>
        <Box className={s.fotterControl} px={3} px={2}>
          <Typography variant="subtitle2">
            Якщо ваше замовлення готове, перейдіть до наступного етапу
          </Typography>
          <Button className={s.NextStep} onClick={NextStep}>
            Далі
          </Button>
        </Box>
      </div>

      <ModalOrder
        open={open}
        onNomenclature={onNomenclature}
        onDirections={onDirections}
        handleClose={handleClose}
      ></ModalOrder>
    </>
  );
};
