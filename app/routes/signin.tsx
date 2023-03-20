import React, { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DataFunctionArgs, json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import styled from '@emotion/styled';
import { Button, Checkbox, Divider, TextField, Typography } from '@mui/material';
import { loaderCommonInit } from '@/lib/loaderCommon';
import { Page } from '@/components/Layout';
import GoogleSymbolImg from '@/assets/img/google_symbol.png';
import KakaoSymbolImg from '@/assets/img/kakao_symbol.png';

export const loader = async ({ request }: DataFunctionArgs) => {
  try {
    const result = await loaderCommonInit(request);
    if (result) return result;
  } catch (err) {
    console.error(err);
  }
  return json({ env: process.env.NODE_ENV });
};

export const handle = { i18n: 'signin' };

const Container = styled(Page)`
  .contents {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .signin-form {
      display: flex;
      flex-direction: column;
      min-width: 300px;
      gap: 20px;

      .signin-title {
        text-align: center;
        margin: 0;
      }

      .auto-signin-wrapper {
        position: relative;
        display: flex;
        align-items: center;

        .auto-signin-chkbox-root {
          position: absolute;
          transform: translate(-9px, 0);
        }

        label {
          position: relative;
          left: 25px;
          padding-top: 2px;
        }
      }

      .link-wrapper {
        display: flex;
        flex-direction: column;
        gap: 10px;

        a {
          color: inherit;
          text-decoration: none;

          span {
            text-decoration: underline;
            text-underline-offset: 2px;
          }
        }
      }

      .social-signin-wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 10px;

        .social-signin-btn {
          display: flex;
          align-items: center;
          height: 36px;
          border: none;
          border-radius: 4px;
          color: #000000;
          padding: 5px 10px;
          cursor: pointer;

          img {
            position: absolute;
            width: 20px;
            margin-right: 6px;
          }

          span {
            flex: 1;
            text-align: center;
            font-size: 14px;
          }

          &.google-btn {
            background-color: #ffffff;
            border: 1px solid rgba(15, 15, 15, 0.15);

            span {
              color: rgba(0, 0, 0, 0.54);
            }
          }

          &.kakao-btn {
            background-color: rgb(254, 229, 0);
            border: 1px solid rgb(254, 229, 0);

            span {
              color: rgba(0, 0, 0, 0.85);
            }
          }
        }
      }
    }
  }

  @media (max-width: 330px) {
    .contents {
      justify-content: flex-start;
    }
  }

  @media (max-height: 560px) {
    .contents {
      align-items: flex-start;
    }
  }
`;

const SignIn = () => {
  const { env } = useLoaderData<typeof loader>();

  const [isValidForm, setIsValidForm] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const { t } = useTranslation('signin');

  const handleFormChange = () => setIsValidForm(formRef.current?.checkValidity() ?? false);
  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = e => e.preventDefault();

  const signinQueryString = useMemo(() => (env === 'production' ? '' : '?env=development'), [env]);

  return (
    <Container>
      <form ref={formRef} className="signin-form" onChange={handleFormChange} onSubmit={handleFormSubmit}>
        <Typography className="signin-title" variant="h4">
          StockBox
        </Typography>
        <TextField type="email" variant="standard" id="email" name="email" label={t('email')} autoFocus required />
        <TextField type="password" variant="standard" id="pwd" name="pwd" label={t('password')} required />
        <div className="auto-signin-wrapper">
          <Checkbox name="autosignin" id="auto-signin" size="small" classes={{ root: 'auto-signin-chkbox-root' }} />
          <Typography variant="caption" component="label" htmlFor="auto-signin">
            {t('maintainSignInStatus')}
          </Typography>
        </div>
        <Button type="submit" variant="outlined" disabled={!isValidForm}>
          {t('signin')}
        </Button>
        <div className="link-wrapper">
          <Link to="/findaccount">
            <Typography variant="caption">{t('findAccount')}</Typography>
          </Link>
          <Link to="/signup">
            <Typography variant="caption">{t('createAccount')}</Typography>
          </Link>
        </div>
        <Divider />
        <div className="social-signin-wrapper">
          <button type="button" className="social-signin-btn google-btn">
            <img src={GoogleSymbolImg} alt="Kakao signin Symbol" />
            <Typography color="#000" component="span">
              {t('googleSignIn')}
            </Typography>
          </button>
          <button type="button" className="social-signin-btn kakao-btn" onClick={() => (window.location.href = `/api/auth/login/kakao${signinQueryString}`)}>
            <img src={KakaoSymbolImg} alt="Kakao signin Symbol" />
            <Typography color="#000" component="span">
              {t('kakaoSignIn')}
            </Typography>
          </button>
        </div>
      </form>
    </Container>
  );
};

export default SignIn;
