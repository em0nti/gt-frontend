import { hasLength, isEmail, useForm } from '@mantine/form';
import {
  TextInput,
  Text,
  Anchor,
  Paper,
  Group,
  Button,
  Stack,
  Divider,
  PasswordInput,
} from '@mantine/core';
import { GoogleButton } from '@/modules/Register/components/GoogleButton';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk } from '@/redux/operations';
import css from './styles/LoginForm.module.css';
import { selectLoading } from '@/redux/slices/authSlice.js';
import {
  IconAlertCircle,
  IconCircleCheck,
  IconEye,
  IconEyeOff,
  IconLogin2,
} from '@tabler/icons-react';
import clsx from 'clsx';
import Modal from '@/components/Modal';
import { ForgotPassword } from './ForgotPassword';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';

function LoginForm() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const [isOpen, setIsOpen] = useState(false);
  const [visible, { toggle }] = useDisclosure(false);
  const { t } = useTranslation();

  const handleCloseModal = () => {
    setIsOpen((prev) => !prev);
  };

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: isEmail(t('register.errorEmail')),
      password: hasLength({ min: 6 }, t('register.errorPassword')),
    },
  });

  function handleGoogleButtonClick() {
    window.location.href = 'https://gt-project.onrender.com/api/auth/google';
  }

  return (
    <Paper className={css.wrappForm}>
      <Text className={css.titleForm} c="blue.4">
        {t('login.title')}
      </Text>

      <Group className={css.wrappGoogleButton} grow>
        <GoogleButton
          className={css.googleButton}
          onClick={handleGoogleButtonClick}
          tabIndex={1}
        >
          Google
        </GoogleButton>
      </Group>
      <Divider
        className={css.divider}
        label={t('register.divider')}
        labelPosition="center"
      />
      <form
        className={css.form}
        onSubmit={form.onSubmit((values) => {
          dispatch(loginUserThunk(values));
        })}
      >
        <Stack className={css.stack}>
          <TextInput
            withAsterisk
            label={t('register.email')}
            placeholder={t('register.emailPlcholder')}
            rightSection={
              form.errors?.email ? (
                <IconAlertCircle className={css.iconAlertCircle} />
              ) : form.isValid('email') ? (
                <IconCircleCheck className={css.iconCircleCheck} />
              ) : null
            }
            {...form.getInputProps('email')}
            classNames={{
              wrapper: css.wrapper,
              label: form.isValid('email')
                ? css.labelCorrect
                : form.errors.email
                ? css.labelError
                : css.label,
              error: css.error,
              required: form.isValid('email')
                ? css.requiredCorrect
                : form.errors.username
                ? css.requiredError
                : css.required,
              section: css.section,
              input: clsx(
                css.input,
                form.isValid('email') ? css.inputCorrect : null,
              ),
            }}
            tabIndex={2}
          />

          <PasswordInput
            withAsterisk
            label={t('register.password')}
            placeholder={t('register.passwordPlcholder')}
            visible={visible}
            onVisibilityChange={toggle}
            rightSection={
              <div className={css.wrapperIcon}>
                <Button
                  className={css.buttonIcon}
                  variant="link"
                  onClick={toggle}
                >
                  {visible ? (
                    <IconEye className={css.iconEye} />
                  ) : (
                    <IconEyeOff className={css.iconEyeOff} />
                  )}
                </Button>

                {form.errors?.password ? (
                  <IconAlertCircle className={css.iconAlertCircle} />
                ) : form.values.password.length > 5 ? (
                  <IconCircleCheck className={css.iconCircleCheck} />
                ) : null}
              </div>
            }
            {...form.getInputProps('password')}
            classNames={{
              wrapper: css.wrapper,
              label: form.isValid('password')
                ? css.labelCorrect
                : form.errors.password
                ? css.labelError
                : css.label,
              error: css.error,
              required: form.isValid('password')
                ? css.requiredCorrect
                : form.errors.username
                ? css.requiredError
                : css.required,
              section: css.sectionPassword,
              input: clsx(
                css.input,
                form.isValid('password') ? css.inputCorrect : null,
              ),
              innerInput: css.inputInput,
            }}
            tabIndex={3}
          />
        </Stack>

        <Group className={css.wrappButton}>
          <Anchor
            component="button"
            type="button"
            size="sm"
            onClick={handleCloseModal}
            tabIndex={5}
          >
            {t('login.forgotPassword')}
          </Anchor>

          <Button
            loading={isLoading}
            className={css.button}
            rightSection={<IconLogin2 className={css.iconButton} />}
            type="submit"
            tabIndex={4}
          >
            <Text className={css.textButtonForm}>{t('login.link')}</Text>
          </Button>
        </Group>
      </form>
      {isOpen && (
        <Modal onClose={handleCloseModal}>
          <ForgotPassword onClose={handleCloseModal} />
        </Modal>
      )}
    </Paper>
  );
}
export default LoginForm;
