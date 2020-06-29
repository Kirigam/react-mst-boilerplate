import React from 'react';
import {
  Button,
  Box,
  Typography,
  CircularProgress,
} from '@material-ui/core';

import { Link } from 'react-router-dom';
import routes from '../../../../../constants/routes';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { CustomInput } from '../../../Elements/input/input';

export const ForgotPasswordForm = ({ onSubmit, isLoading }) => {
  const initialValues = {
    email: 'testA1@test.com',
  };
  const validationSchema = Yup.object({
    email: Yup.string().email('Введіть E-mail адресу'),
  });

  return (
    <>
      <div className="auth__form">
        <Box>
          <Typography variant="h3">
            Забули пароль
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
            </div>

            <Box>
              <Link></Link>
              <Button
                type="submit"
              >
                {isLoading ? (
                  <CircularProgress
                    size={22}
                  />
                ) : null}
                Відновити
              </Button>
            </Box>
          </Form>
        </Formik>

         
        <Box>
          <Typography variant="body1" color="textPrimary">
            Ще не зареєcторовані
          </Typography>
          <Box ml={1}>
            <Link
              to={routes.REGISTER}
              style={{ textDecoration: 'none', color: '#5866a1' }}
            >
              <Typography
                variant="body2"
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
