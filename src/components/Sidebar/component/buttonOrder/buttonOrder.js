import s from './buttonOrder.module.scss';
import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { privateRoutes } from '../../../../constants/routes';
import { useStore } from '../../../../stores/stores';
import { useSnackbar } from 'notistack';

export const ButtonOrder = () => {
  const { users } = useStore();
  const AuthUser = users.authUser;

  // var classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function infoMassege(variant, text) {
    enqueueSnackbar(text, { variant });
  }
  const { enqueueSnackbar } = useSnackbar();

  function notHasOrders(){
    infoMassege('warning', 'У вас більше немає безкоштовних замовлень, укладіть договір щоб продовжити роботу на сайті')
  }
 
  return (
    <>
      {AuthUser.client_profile.has_free_order && (AuthUser.client_profile.company === null || AuthUser.client_profile.company.concluded) ? (
        <>
          <Link to={privateRoutes.CREATE_ORDER}>
            <Button
              variant="outlined"
              style={{ fontWeight: '600', margin: '30px 0px' }}
            >
              Офоромити замовлення
            </Button>
          </Link>
        </>
      ) : (
        <>
          <Button
            role="button"
            // disabled
            variant="outlined"
            className={s.buttonDisable}
            onClick={notHasOrders}
            style={{ fontWeight: '600', margin: '30px 0px' }}
          >
            Офоромити замовлення
          </Button>
        </>
      )}
    </>
  );
};
