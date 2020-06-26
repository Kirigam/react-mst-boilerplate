import React, { useState, useEffect } from 'react';
import s from './CreateOrder.module.scss';
import { Box, Typography } from '@material-ui/core';
import * as Api from './../../../Api';
import { OneStepOrder } from '../OneStepOrder/OneStepOrder';
import { TwoStepOrder } from '../TwoStepOrder/TwoStepOrder';
import { ThreeStepOrder } from '../ThreeStepOrder/ThreeStepOrder';
import CreateInfoOrder from './CreateInfoOrderContext';
import storageService from '../../../utils/storageService';
import { useStore } from '../../../stores/stores';

export const CreateOrder = () => {
  const { users } = useStore();
  const AuthUser = users.authUser;

  const [activeStep, setActiveStep] = useState(0);
  // console.log(activeStep);

  const [orderInfo, setOrderInfo] = useState({
    directions: {
      isLoading: true,
      value: [],
      list: [],
    },
    nomenclature: {
      isLoading: true,
      list: [],
      tempList: [],
      value: [],
    },
    manager: {
      isLoading: true,
      list: [],
      value: [],
    },
    newOrder: {
      orderID: '',
      nomenclatures: [],
    },
  });

  useEffect(() => {
    const fetchDirections = () =>
      Promise.all([
        Api.getDirections(),
        Api.getNomenclatures(),
        Api.getManagers(),
      ])
        .then((results) => {
          let tempOrderInfo = {
            directions: {
              isLoading: true,
              value: [],
              list: [],
            },
            nomenclature: {
              isLoading: true,
              list: [],
              tempList: [],
              value: [],
            },
            manager: {
              isLoading: true,
              list: [],
              value: [],
            },
            newOrder: {
              orderID: '',
              nomenclatures: [],
            },
          };
          let tempArrayDirections = [];

          results[0].data.forEach((element) => {
            tempArrayDirections.push({
              label: `${element.name}`,
              value: element.code,
            });
          });

          let allDirections = { label: `Усі напрямки`, value: 'all' };
          tempArrayDirections.unshift(allDirections);

          tempOrderInfo.directions.isLoading = false;
          tempOrderInfo.directions.list = tempArrayDirections;

          let tempArrayNomenclatures = [];
          results[1].data.forEach((element) => {
            tempArrayNomenclatures.push({
              label: `${element.name}`,
              value: element.code,
              direction: {
                code:
                  element.direction !== null
                    ? element.direction.code
                    : null,
              },
              id: element.id,
              manager: {
                code:
                  element.manager !== null
                    ? element.manager.code
                    : null,
              },
            });
          });

          tempOrderInfo.nomenclature.isLoading = false;
          tempOrderInfo.nomenclature.list = tempArrayNomenclatures;
          tempOrderInfo.nomenclature.tempList = tempArrayNomenclatures;

          let tempArrayManagers = [];
          results[2].data.forEach((element) => {
            tempArrayManagers.push({
              phone: element.phone !== null ? element.phone : null,
              email: element.email,
              full_name: element.full_name,
              code: element.manager_profile.code,
            });
          });

          tempOrderInfo.manager.isLoading = false;
          tempOrderInfo.manager.list = tempArrayManagers;

          setOrderInfo(tempOrderInfo);
        })
        .catch((error) => console.log(error));
    fetchDirections();
  }, []);

  // onChange Directions
  function onDirections(direction) {
    let filterNomenclature;
    if (direction.value !== 'all') {
      filterNomenclature = orderInfo.nomenclature.list.filter(
        (item) => item.direction.code === direction.value,
      );
    } else {
      filterNomenclature = orderInfo.nomenclature.list;
    }

    setOrderInfo({
      ...orderInfo,
      directions: {
        ...orderInfo.directions,
        value: direction.value,
      },
      nomenclature: {
        ...orderInfo.nomenclature,
        value: [],
        tempList: filterNomenclature,
      },
      manager: { ...orderInfo.manager, value: [] },
    });
  }

  // onChange Nomenclature
  function onNomenclature(value) {
    const managerValue = orderInfo.manager.list.filter(
      (item) => item.code === value.manager.code,
    );
    // console.log(value);
    // console.log(value.direction);

    let directionValue;
    if (value.direction != null) {
      if (value.direction.code != null) {
        directionValue = orderInfo.directions.list.filter(
          (item) => item.value === value.direction.code,
        );
      } else {
        directionValue = [];
      }
    } else {
      directionValue = [];
    }

    let filterNomenclature;
    if (directionValue[0] != undefined) {
      filterNomenclature = orderInfo.nomenclature.list.filter(
        (item) => item.direction.code === directionValue[0].value,
      );
    } else {
      filterNomenclature = orderInfo.nomenclature.list;
    }

    // console.log(value );

    setOrderInfo({
      ...orderInfo,
      nomenclature: {
        ...orderInfo.nomenclature,
        value: value,
        tempList: filterNomenclature,
      },

      directions: {
        ...orderInfo.directions,
        value: directionValue[0],
      },
      manager: { ...orderInfo.manager, value: managerValue },
    });
  }
  useEffect(() => {
    if (storageService.get('continueOrderID')) {
      setActiveStep(1);
      const continueOrderID = Number(
        storageService.get('continueOrderID'),
      );

      setTimeout(localStorage.removeItem('continueOrderID'))

      Promise.resolve(Api.getNomenclatureOrder(continueOrderID)).then(
        (results) => {
          setOrderInfo({
            ...orderInfo,
            directions: {
              ...orderInfo.directions,
              value: [],
            },
            nomenclature: {
              ...orderInfo.nomenclature,
              value: [],
            },
            newOrder: {
              ...orderInfo.newOrder,
              orderID: results.data.order_id,
              nomenclatures: results.data,
            },
          });
        },
      );
    }
  }, []);

  // function

  return (
    <>
    
      <CreateInfoOrder.Provider
        value={{ ...orderInfo, setOrderInfo }}
      >
        {activeStep === 0 && (
          <Box my={6} mx={4}>
            <Typography className={s.MainTitle} variant="h4">
              Створення замовлення
            </Typography>
            <Box my={2} mb={6}>
              <Typography variant="body1" className={s.SubMainTitle}>
                Додайте товар до замовлення.{' '}
              </Typography>
            </Box>

            <OneStepOrder
              // directions={directions}
              // Nomenclature={Nomenclature}
              setActiveStep={setActiveStep}
              onNomenclature={onNomenclature}
              onDirections={onDirections}
              // manager={manager.value}
              // newOrder={newOrder}
              // setNewOrder={setNewOrder}
              // setOrderStep={setOrderStep}
            ></OneStepOrder>
          </Box>
        )}
        {activeStep === 1 && (
          <Box py={6} px={4}>
            <Typography className={s.MainTitle} variant="h4">
              Створення замовлення
            </Typography>
            <Box my={2} mb={2}>
              <Typography variant="h5" className={s.SubMainTitle}>
                Додайте товар до замовлення.
              </Typography>
            </Box>
            <TwoStepOrder
              onNomenclature={onNomenclature}
              onDirections={onDirections}
              setActiveStep={setActiveStep}

              // setNewOrder={setNewOrder}
              // newOrder={newOrder}
            ></TwoStepOrder>
          </Box>
        )}

        {activeStep === 2 && (
          <Box my={6} mx={4}>
            <Typography className={s.MainTitle} variant="h4">
              Оформлення замовлення. 
              {AuthUser.client_profile.has_free_order &&(<>Реєстрація</>)}
              
            </Typography>
            <Box my={2} mb={4}>
              <Typography variant="h5" className={s.SubMainTitle}>
                Для продовження заповніть форму даними бізнесу
               
              </Typography>
            </Box>
            <ThreeStepOrder></ThreeStepOrder>
            {/* <TwoStepOrder></TwoStepOrder> */}
          </Box>
        )}
      </CreateInfoOrder.Provider>
    </>
  );
};
