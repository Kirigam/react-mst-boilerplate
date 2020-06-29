import React from 'react';
import useStyles from './FreeOrderStyle.js';
import { Box, Typography, Button } from '@material-ui/core';
import { ButtonStandart } from '../../components/form/button/button.js';
import { Link } from 'react-router-dom';
import { routes } from '../routes.js';

export const FreeOrder = () => {
    const s = useStyles();

  return (
    <>
      <Box my={6} mx={4}>
        <Typography className={s.MainTitle} variant="h4"  >
          Оформлення замовлення
        </Typography>
        <Box my={2} mb={6}>
            <Typography variant="body1" className={s.SubMainTitle}>У вас є можливість створити одне безкоштовне замовлення. </Typography>
            <Typography variant="body1" className={s.SubMainTitle}>Бажаєте його використати?</Typography>
        </Box>
        <Box>
            <Link to={routes.createOrder}>
            <ButtonStandart>Безкоштовне замовлення</ButtonStandart>
            </Link>
           
            {/* <Button ></Button> */}
        </Box>
      </Box>
    </>
  );
};
