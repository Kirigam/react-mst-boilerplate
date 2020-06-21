import React, { useState, useEffect } from 'react';
import s from './CreateOrder.module.scss';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  Avatar,
} from '@material-ui/core';
// import Api from './../../../api';
import { Form, Formik } from 'formik';
import * as Api from './../../../Api';
import { CardManager } from './../CardManager/CardManager';

import {
  DatePicker,
  // TimePicker,
  // DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Select from 'react-select';
import { FirstStepOrder } from '../FirstStepOrder/FirstStepOrder';
export const CreateOrder = () => {
  // const s = useStyles();

  const [directions, setDirections] = useState({
    isLoading: true,
    value: [],
    list: [],
  });
  const [Nomenclature, setNomenclature] = useState({
    isLoading: true,
    list: [],
    tempList: [],
    value: [],
  });

  const [manager, setManager] = useState({
    isLoading: true,
    list: [],
    // tempList: [],
    value: [],
  });

  useEffect(() => {
    const fetchDirections = async () => {
      try {
        const responseDirections = await Api.getDirections();
        const responseNomenclatures = await Api.getNomenclatures();
        const responseManagers = await Api.getManagers();
        let results = await Promise.all([
          responseDirections,
          responseNomenclatures,
          responseManagers,
        ]).then((results) => {
          let tempArrayDirections = [];
          results[0].data.forEach((element) => {
            tempArrayDirections.push({
              label: `${element.name}`,
              value: element.code,
            });
          });
          let allDirections = { label: `Усі напрямки`, value: 'all' };
          tempArrayDirections.unshift(allDirections);
          setDirections({
            ...directions,
            isLoading: false,
            list: tempArrayDirections,
          });

          let tempArrayNomenclatures = [];
          results[1].data.forEach((element) => {
            // console.log(element);

            tempArrayNomenclatures.push({
              label: `${element.name}`,
              value: element.code,
              direction: {
                code:
                  element.direction !== null
                    ? element.direction.code
                    : null,
              },
              manager: {
                code:
                  element.manager !== null
                    ? element.manager.code
                    : null,
              },
            });
          });
          setNomenclature({
            ...Nomenclature,
            isLoading: false,
            list: tempArrayNomenclatures,
            tempList: tempArrayNomenclatures,
          });

          let tempArrayManagers = [];
          results[2].data.forEach((element) => {
            console.log(element);

            tempArrayManagers.push({
              phone: element.phone !== null ? element.phone : null,
              email: element.email,
              full_name: element.full_name,
              code: element.manager_profile.code,
            });
          });
          setManager({
            ...manager,
            isLoading: false,
            list: tempArrayManagers,
            //   tempList: tempArray,
          });
        });
      } catch (e) {
        console.log(e);
      }
    };
    fetchDirections();
  }, []);

  useEffect(() => {
    const fetchManager = async () => {
      try {
        const response = await Api.getManagers();
      } catch (e) {
        console.log(e);
      }
    };
    fetchManager();
  }, []);

  // onChange Directions
  function onDirections(direction) {
    let filterNomenclature;
    if (direction.value !== 'all') {
      filterNomenclature = Nomenclature.list.filter(
        (item) => item.direction.code === direction.value,
      );
    } else {
      filterNomenclature = Nomenclature.list;
    }

    setNomenclature({
      ...Nomenclature,
      value: [],
      tempList: filterNomenclature,
    });
    setDirections({
      ...directions,
      value: direction,
    });
    setManager({
      ...manager,
      value: [],
    });
  }
  // onChange onNomenclature
  function onNomenclature(value) {
    // console.log('onNomenclature -> value', value);

    const managerValue = manager.list.filter(
      (item) => item.code === value.manager.code,
    );

    const directionValue = directions.list.filter(
      (item) => item.value == value.direction.code,
    );
    // console.log('onNomenclature -> directionValue', directionValue);

    const filterNomenclature = Nomenclature.list.filter(
      (item) => item.direction.code === directionValue[0].value,
    );

    setNomenclature({
      ...Nomenclature,
      value: value,
      tempList: filterNomenclature,
    });

    setDirections({
      ...directions,
      value: directionValue[0],
    });
    setManager({
      ...manager,
      value: managerValue,
    });
  }

  return (
    <>
      <Box my={6} mx={4}>
        <Typography className={s.MainTitle} variant="h4">
          Створення замовлення
        </Typography>
        <Box my={2} mb={6}>
          <Typography variant="body1" className={s.SubMainTitle}>
            Додайте товар до замовлення.{' '}
          </Typography>
        </Box>
        <FirstStepOrder
          directions={directions}
          Nomenclature={Nomenclature}
          onNomenclature={onNomenclature}
          onDirections={onDirections}
          manager={manager.value}
        ></FirstStepOrder>
      </Box>

      <Box my={6} mx={4}>
        <Typography className={s.MainTitle} variant="h4">
          Створення замовлення
        </Typography>
        <Box my={2} mb={6}>
          <Typography variant="h5" className={s.SubMainTitle}>
            Додайте товар до замовлення.{' '}
          </Typography>
        </Box>
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
        {/* <FirstStepOrder
          directions={directions}
          Nomenclature={Nomenclature}
          onNomenclature={onNomenclature}
          onDirections={onDirections}
          manager={manager.value}
        ></FirstStepOrder> */}
      </Box>
    </>
  );
};
