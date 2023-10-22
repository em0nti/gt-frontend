import { Button } from '@mantine/core';
import { useState } from 'react';
import ChangePasswordForm from '../ChangePasswordForm/ChangePasswordForm';
import Modal from '@/components/Modal';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { clearError } from '@/redux/slices/authSlice';

function ChangePassButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleClose = () => {
    dispatch(clearError());
    onClose();
  };

  return (
    <>
      <Button onClick={handleEdit}>
        {t('changePasswordForm.changePassBtn')}
      </Button>
      {isOpen && (
        <Modal onClose={handleClose}>
          <ChangePasswordForm onClose={handleClose} />
        </Modal>
      )}
    </>
  );
}

export default ChangePassButton;
