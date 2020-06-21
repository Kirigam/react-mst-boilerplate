import React from 'react';
import s from './CardManager.module.scss';
import {
  Card,
  Typography,
  Box,
  Avatar,
  Button,
} from '@material-ui/core';
import { SetingsSVG } from '../../../assetc/svg/setings';

export const CardManager = ({ ...props }) => {
  const { manager } = props;
  console.log(manager);

  return (
    <>
      {manager.length > 0 ? (
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
                {manager[0].full_name && (
                  <Typography className={s.cardName} variant="body2">
                    {manager[0].full_name}
                  </Typography>
                )}
                {manager[0].email && (
                  <a
                    href={`mailto:${manager[0].email}`}
                    className={s.cardMailLink}
                  >
                    <Typography
                      className={s.cardMail}
                      variant="body2"
                    >
                      {manager[0].email}
                    </Typography>
                  </a>
                )}
                {manager[0].phone && (
                  <a
                    href={`tel:${manager[0].phone}`}
                    className={s.cardMailLink}
                  >
                    <Typography
                      className={s.cardMail}
                      variant="body2"
                    >
                      {manager[0].phone}
                    </Typography>
                  </a>
                )}
                {manager[0].email && (
                  <a
                    className={s.cardButtonLink}
                    href={`mailto:${manager[0].email}`}
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
