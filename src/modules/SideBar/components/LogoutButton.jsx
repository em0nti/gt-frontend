import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Button } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { logoutUserThunk } from '@/redux/operations';

import css from '../styles/LogoutButton.module.css';
import { reset as tasksReset } from '@/modules/Calendar/redux/tasksSlice.js';
import { reset as reviewsReset } from '@/modules/Reviews/redux/reviewsSlice.js';

function LogoutButton({ className }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onLogout = () => {
    dispatch(logoutUserThunk());
    dispatch(tasksReset());
    dispatch(reviewsReset());
  };

  return (
    <Button
      className={clsx(css.logout, className)}
      radius="lg"
      rightSection={<IconLogout width={18} height={18} />}
      classNames={{
        section: css.section,
      }}
      onClick={onLogout}
    >
      {t('sidebar.logout')}
    </Button>
  );
}

LogoutButton.propTypes = {
  className: PropTypes.string,
};

export default LogoutButton;
