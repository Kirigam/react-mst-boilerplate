import React from 'react';
import s from './ModalOrder.module.scss';
import {
  Modal,
  Fade,
  Typography,
  IconButton,
} from '@material-ui/core';

import { CreateOrderProduct } from '../../Form/CreateOrderProduct/CreateOrderProduct';
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
                    <Closse color="#5866a1" width="18px"></Closse>
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
