import React, { useContext } from 'react';
import s from './CardManager.module.scss';
import {
  Card,
  Typography,
  Box,
  Avatar,
  Button,
} from '@material-ui/core';
import { SetingsSVG } from '../../../assetc/svg/setings';
import CreateInfoOrder from '../CreateOrder/CreateInfoOrderContext';

export const CardManager = ({ ...props }) => {
  // const { manager } = props;
  // console.log(manager);
  const { manager } = useContext(
    CreateInfoOrder,
  );
  console.log(manager );
  console.log(manager.value[0] );
  
  return (
    <>
      {manager.value.length > 0 ? (
        <>
          <Card p={3} className={s.card}>
            <Typography className={s.cardTitle}>
              Ваш менеджер
            </Typography>
            <Box variant="outlined" display="flex">
              <Box mr={2}>
                {/* User Photo */}
                <Avatar
                  style={{
                    width: 40,
                    height: 40,
                    transition: '0.3s',
                  }}
                />
              </Box>
              <Box>
                {!!manager.value[0].full_name && (
                  <Typography className={s.cardName} variant="body2">
                    {manager.value[0].full_name}
                  </Typography>
                )}
                {manager.value[0].email && (
                  <a
                    href={`mailto:${manager.value[0].email}`}
                    className={s.cardMailLink}
                  >
                    <Typography
                      className={s.cardMail}
                      variant="body2"
                    >
                      {manager.value[0].email}
                    </Typography>
                  </a>
                )}
                {manager.value[0].phone && (
                  <a
                    href={`tel:${manager.value[0].phone}`}
                    className={s.cardMailLink}
                  >
                    <Typography
                      className={s.cardMail}
                      variant="body2"
                    >
                      {manager.value[0].phone}
                    </Typography>
                  </a>
                )}
                {manager.value[0].email && (
                  <a
                    className={s.cardButtonLink}
                    href={`mailto:${manager.value[0].email}`}
                  >
                    <SetingsSVG
                      color="#5866a1"
                      name="setings"
                    ></SetingsSVG>
                    <Typography>Написати менеджеру</Typography>
                  </a>
                )}
              </Box>
            </Box>
          </Card>
        </>
      ) : (
        // <Loader></Loader>
        <div className=""></div>
      )}
    </>
  );
};
