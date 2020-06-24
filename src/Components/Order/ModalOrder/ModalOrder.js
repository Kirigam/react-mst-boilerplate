import React, { useState, useContext } from 'react';
import s from './ModalOrder.module.scss';
import {
  Modal,
  Fade,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';

import Select from 'react-select';
import * as Yup from 'yup';
import moment from 'moment';
import { Form, Formik, Field } from 'formik';
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { CustomInput } from '../../Form/Elements/input/input';
// import CreateInfoOrder from '../CreateOrder/CreateInfoOrderContext';
import * as Api from '../../../Api';
import storageService from '../../../utils/storageService';
import { NameStorage } from '../../../Constants/Index';
import { CreateOrderProduct } from './../../Form/CreateOrderProduct/CreateOrderProduct';
import { SetingsSVG } from './../../../assetc/svg/setings';
import { Closse } from '../../../assetc/svg/Closse';

export const ModalOrder = ({ ...props }) => {
  const {
    open,
    handleClose,
    onNomenclature,
    onDirections = { onDirections },
  } = props;

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={s.ModalWrapBox}>
            <div className={s.modal}>
              <div className={s.modalHeader}>
                <Typography variant="h3">Додавання Товару</Typography>
                {open ? (
                  <IconButton
                    aria-label="close"
                    onClick={handleClose}
                  >
                    <Closse
                      color="#5866a1"
                      width="18px"
                    ></Closse>
                    {/* <CloseIcon /> */}
                  </IconButton>
                ) : null}
              </div>
            </div>

            <div className={s.modalBox}>
              <CreateOrderProduct
               
               handleClose={handleClose}
                onNomenclature={onNomenclature}
                onDirections={onDirections}
              ></CreateOrderProduct>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};
