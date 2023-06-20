import { FormEventHandler, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { DataFunctionArgs, json } from '@remix-run/node';
import { Box, Button, LinearProgress, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import { Page } from '@/components/Layout';
import { loaderCommonInit } from '@/lib/loaderCommon';
import axios, { AxiosError } from 'axios';
import PasswordRegx from '@/components/auth/RegExp';
import { useNavigate } from '@remix-run/react';

export const loader = async ({ request }: DataFunctionArgs) => {
  try {
    const result = await loaderCommonInit(request);
    if (result) return result;
  } catch (err) {
    console.error(err);
  }
  return json({ env: process.env.NODE_ENV });
};

export const handle = {
  i18n: 'findAccount'
};

const Container = styled(Page)`
  .contents {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .box {
      padding: 1em 3rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 400px;
      width: 100%;

      .send-mail-form,
      .reset-pwd-form {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 15px;

        .submit-button {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
        }
      }

      .reset-pwd-form {
        margin-top: 30px;
      }
    }
  }
`;

const FindAccount = () => {
  const [userId, setUserId] = useState<number | null>(null);

  const { t } = useTranslation('findAccount');
  const navigate = useNavigate();

  const showAlert = useCallback(
    async (type: 'success' | 'error', text: any) =>
      await Swal.fire({
        icon: type,
        title: t('findPassword') as string,
        text,
        confirmButtonText: t('confirm') as string,
        cancelButtonText: t('cancel') as string,
        showConfirmButton: type === 'success',
        showCancelButton: type === 'error',
        heightAuto: false
      }),
    [t]
  );

  const handleSubmitSendMailForm: FormEventHandler<HTMLFormElement> = useCallback(
    e => {
      e.preventDefault();
      const email = e.currentTarget.email.value;
      const name = e.currentTarget.username.value;

      if (!email) return showAlert('error', t('noEmail'));
      if (!name) return showAlert('error', t('noName'));

      axios
        .post(
          '/api/auth/send/password',
          { email, name },
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then(({ data: { user_id } }) => {
          setUserId(user_id);
          showAlert('success', t('sendFindPasswordMailSuccess'));
        })
        .catch((err: AxiosError) => {
          console.error(err);
          if (err.response?.status === 404) {
            showAlert('error', t('wrongEmailOrName'));
            return;
          }
          showAlert('error', t('unknownError'));
        });
    },
    [showAlert, t]
  );

  const handleSubmitResetPasswordForm: FormEventHandler<HTMLFormElement> = useCallback(
    e => {
      e.preventDefault();
      if (userId === null) return;

      const currentPassword = e.currentTarget.currentPassword.value;
      const newPassword = e.currentTarget.newPassword.value;
      const newPasswordConfirm = e.currentTarget.newPasswordConfirm.value;

      if (!currentPassword) return showAlert('error', t('noCurrentPassword'));
      if (!newPassword) return showAlert('error', t('noNewPassword'));
      if (!newPasswordConfirm) return showAlert('error', t('noNewPasswordConfirm'));
      if (newPassword !== newPasswordConfirm) return showAlert('error', t('checkPassword'));
      if (!PasswordRegx(newPassword)) return showAlert('error', t('passwordRegex'));

      axios
        .post(
          '/api/auth/change/password',
          { user_id: userId, password: newPassword },
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then(() => {
          showAlert('success', t('changePasswordSuccess')).then(() => {
            navigate('/');
          });
        })
        .catch((err: AxiosError) => {
          console.error(err);
          showAlert('error', t('unknownError'));
        });
    },
    [userId, showAlert, t, navigate]
  );

  return (
    <Container>
      <Box className="box">
        <Typography variant="h4" gutterBottom>
          StockBox
        </Typography>
        <Typography variant="h6">{t('findPassword')}</Typography>
        <Box sx={{ width: '23%' }}>
          <LinearProgress />
        </Box>
        <form className="send-mail-form" onSubmit={handleSubmitSendMailForm}>
          <TextField
            label={t('email')}
            type="email"
            name="email"
            variant="standard"
            autoFocus
            required
            fullWidth
            disabled={userId !== null}
          />
          <TextField
            label={t('name')}
            name="username"
            variant="standard"
            autoFocus
            required
            fullWidth
            disabled={userId !== null}
          />
          <Button
            className="submit-button"
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={userId !== null}
          >
            {t('resetPassword')}
          </Button>
        </form>
        {userId !== null && (
          <form className="reset-pwd-form" onSubmit={handleSubmitResetPasswordForm}>
            <TextField
              label={t('currentPassword')}
              type="password"
              name="currentPassword"
              variant="standard"
              autoFocus
              required
              fullWidth
            />
            <TextField
              label={t('newPassword')}
              type="password"
              name="newPassword"
              variant="standard"
              autoFocus
              required
              fullWidth
            />
            <TextField
              label={t('newPasswordConfirm')}
              type="password"
              name="newPasswordConfirm"
              variant="standard"
              autoFocus
              required
              fullWidth
            />
            <Button
              className="submit-button"
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              {t('changePassword')}
            </Button>
          </form>
        )}
      </Box>
    </Container>
  );
};

export default FindAccount;
