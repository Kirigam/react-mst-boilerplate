import React from 'react';
import {
  Button,
  Box,
  Typography,
  CircularProgress,
} from '@material-ui/core';
// import google from './../../../../assetc/svg/google.svg';
import { Link } from 'react-router-dom';
// import { LineSeparator } from '../../compotents/LineSeparator/LineSeparator';
// import { routes } from '../../../routes';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import useStyles from '../../AuthStyle';
import { CustomInput } from '../../../Elements/input/input';
import { PublicRoute } from '../../../../../Constants/Index';
// import { CustomInput } from '../../../Elements/input/input';
// import { CustomInput } from '../../../../components/form/input/input';

export const LoginFormComponent = ({ onSubmit, isLoading }) => {
  const initialValues = {
    email: 'client1@company1.com',
    password: 'client1',
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Поле обов'язкове для заповнення")
      .email('Введіть E-mail адресу'),
    password: Yup.string().required(
      "Поле обов'язкове для заповнення",
    ),
  });

  var classes = useStyles();

  return (
    <>
      <div className="auth__form">
        <Box>
          <Typography variant="h3" className={classes.authFormTitle}>
            Логін
          </Typography>
        </Box>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <div>
              <Field
                placeholder="E-mail"
                name="email"
                id="email"
                type="text"
                component={CustomInput}
              />
              <Field
                placeholder="Пароль"
                name="password"
                id="password"
                type="password"
                component={CustomInput}
              />
            </div>

            <Box className={classes.formFooter}>
              <Link
                className={classes.formFooter_link}
                to={PublicRoute.FORGOTPASWORD}
              >
                {/* <Typography  className={`${classes.link_standart}`} variant="body2">Забули пароль</Typography> */}
              </Link>
              <Button
                type="submit"
                className={classes.formFooter_button}
              >
                {isLoading ? (
                  <CircularProgress
                    size={22}
                    className={classes.loginLoader}
                  />
                ) : null}
                Увійти
              </Button>
            </Box>
          </Form>
        </Formik>

        {/* <LineSeparator></LineSeparator> */}
        <Box display="flex" justifyContent="center">
          {/* <Button size="large" className={classes.googleButton}>
            <img
              src={google}
              alt="google"
              className={classes.googleIcon}
            />
            Увійти через Gmail
          </Button> */}
        </Box>
        <Box className={classes.auth__form_footer}>
          <Typography variant="body1" color="textPrimary">
            Ще не зареєcторовані
          </Typography>
          <Box ml={1}>
            <Link
              to={PublicRoute.REGISTER}
              style={{ textDecoration: 'none', color: '#5866a1' }}
             
            >
              <Typography
                variant="body2"
                className={`${classes.link_standart}`}
                style={{ textTransform: 'initial' }}
              >
                Зареєструватися
              </Typography>
            </Link>
          </Box>
        </Box>
      </div>
    </>
  );
};
