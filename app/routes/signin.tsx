import { Page } from '@/components/Layout';
import styled from '@emotion/styled';
import { Button, Checkbox, Divider, TextField, Typography } from '@mui/material';
import { Link } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import GoogleSymbolImg from '@/assets/img/google_symbol.png';
import KakaoSymbolImg from '@/assets/img/kakao_symbol.png';
import { loaderCommonInit } from '@/lib/loaderCommon';
import { DataFunctionArgs, json } from '@remix-run/node';

export const loader = async ({ request }: DataFunctionArgs) => {
  try {
    const result = await loaderCommonInit(request);
    if (result) return result;
  } catch (err) {
    console.error(err);
  } finally {
    return json(null);
  }
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
  const { t } = useTranslation('signin');

  return (
    <Container>
      <form className="signin-form">
        <Typography className="signin-title" variant="h4">
          Stockbox
        </Typography>
        <TextField type="email" variant="standard" id="email" name="email" label={t('email')} autoFocus required />
        <TextField type="password" variant="standard" id="pwd" name="pwd" label={t('password')} required />
        <div className="auto-signin-wrapper">
          <Checkbox name="autosignin" id="auto-signin" size="small" classes={{ root: 'auto-signin-chkbox-root' }} />
          <Typography variant="caption" component="label" htmlFor="auto-signin">
            {t('maintainSignInStatus')}
          </Typography>
        </div>
        <Button type="submit" variant="outlined">
          {t('signin')}
        </Button>
        <div className="link-wrapper">
          <Link to="#">
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
          <button type="button" className="social-signin-btn kakao-btn">
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
