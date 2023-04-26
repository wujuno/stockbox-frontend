import { Page } from '@/components/Layout';
import styled from '@emotion/styled';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  LinearProgress,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { DataFunctionArgs, json } from '@remix-run/node';
import { loaderCommonInit } from '@/lib/loaderCommon';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { LoadingButton } from '@mui/lab';
import Terms from '@/components/auth/Terms';
import PasswordRegx from '@/components/auth/RegExp';
import axios from 'axios';
import { useNavigate } from '@remix-run/react';

export const handle = { i18n: 'signup' };

export const loader = async ({ request }: DataFunctionArgs) => {
  try {
    const result = await loaderCommonInit(request);
    if (result) return result;
  } catch (err) {
    console.error(err);
  }
  return json({ env: process.env.NODE_ENV });
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
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  .submit-button {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
  .check-button {
    margin-bottom: 6px;
    text-transform: none;
  }
  .dbcheck-success-icon {
    margin-bottom: 6px;
    margin-right: 5px;
  }
`;

const SignUp = () => {
  const [checked, setChecked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [sEmail, setSEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailState, setEmailState] = useState(false);
  const [emailDbcheckState, setEmailDbcheckState] = useState(false);
  const [passwordState, setPasswordState] = useState(false);
  const [confirmPasswordState, setConfirmPasswordState] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [nameState, setNameState] = useState('');
  const [nameError, setNameError] = useState('');
  const [sNickname, setSNickname] = useState('');
  const [nicknameState, setNicknameState] = useState(false);
  const [nicknameError, setNicknameError] = useState('');
  const [nicknameDbcheckState, setNicknameDbcheckState] = useState(false);
  const [extraAddrError, setExtraAddrError] = useState('');
  const [tfValue, setTfValue] = useState('');
  const [value, setValue] = useState<Dayjs | null>(null);
  const [submitPossible, setSubmitPossible] = useState(true);
  const [nicknameBtn, setNicknameBtn] = useState(true);
  const [emailBtn, setEmailBtn] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const { t } = useTranslation('signup');
  const navigate = useNavigate();

  // 우편주소 구현

  // 비밀번호 visible handdler
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  // 이름 변경 체크
  const nameChangeHanddler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameState(event.currentTarget.value);
  };
  // 별명 변경 체크
  const nicknameChangeHanddler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNicknameState(Boolean(event.currentTarget.value) && event.currentTarget.value.length < 31);
    setNicknameDbcheckState(false);
    setNicknameError('');
    setNicknameBtn(Boolean(!event.currentTarget.value));
    setSNickname(event.currentTarget.value);
  };
  //별명 중복 체크 중복시 setError
  const nicknameDbcheckHandler = async () => {
    await axios
      .get(`/api/auth/duplicate/nickname/${sNickname}`)
      .then(response => {
        console.log(response.data);
        setNicknameError('');
        setNicknameDbcheckState(nicknameState);
      })
      .catch(error => {
        console.log(error);
        setNicknameError('중복된 별명 입니다.');
        setNicknameDbcheckState(false);
      });
  };
  // 이메일 변경 및 유효성 체크
  const emailChangeHanddler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailDbcheckState(false);
    setEmailError('');
    setSEmail(event.currentTarget.value);
    const emailRegex =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (!emailRegex.test(event.currentTarget.value)) {
      setEmailState(false);
      setEmailBtn(true);
    } else {
      setEmailState(true);
      setEmailBtn(false);
    }
  };
  //이메일 중복 체크 중복시 setError
  const emailDbcheckHandler = async () => {
    await axios
      .get(`/api/auth/duplicate/email/${sEmail}`)
      .then(response => {
        console.log(response.data);
        setEmailError('');
        setEmailDbcheckState(true);
      })
      .catch(error => {
        console.log(error);
        setEmailError('중복된 이메일 입니다.');
        setEmailDbcheckState(false);
      });
  };
  // 비밀번호 변경 및 정규식 체크
  const passwordChangeHanddler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordError('');
    if (!PasswordRegx(event.currentTarget.value)) {
      setPasswordState(false);
    } else {
      setPasswordState(true);
    }
  };
  // 확인 비밀번호 변경 및 정규식 체크
  const confirmPasswordChangeHanddler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordError('');
    if (!PasswordRegx(event.currentTarget.value)) {
      setConfirmPasswordState(false);
    } else {
      setConfirmPasswordState(true);
    }
  };
  // 동의 체크
  const agreeHanddler = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleClose();
    setChecked(Boolean(event.currentTarget.ariaValueText));
  };
  const disagreeHanddler = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleClose();
    setChecked(Boolean(event.currentTarget.ariaValueText));
  };
  // 상세주소 핸들러
  const extraAddrHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.length > 29) {
      setExtraAddrError(`${t('extraAddrError')}`);
    } else {
      setExtraAddrError('');
    }
  };

  // submit possible handler
  useEffect(() => {
    setSubmitPossible(
      !(
        nameState &&
        nicknameState &&
        nicknameDbcheckState &&
        emailState &&
        emailDbcheckState &&
        passwordState &&
        confirmPasswordState &&
        !extraAddrError &&
        checked
      )
    );
  }, [
    nameState,
    nicknameState,
    nicknameDbcheckState,
    emailState,
    emailDbcheckState,
    passwordState,
    confirmPasswordState,
    extraAddrError,
    checked
  ]);

  // form Handdler
  const submitHanddler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const joinData = {
      name: String(data.get('name')),
      nickname: data.get('nickname'),
      email: String(data.get('email')),
      password: data.get('password'),
      confirmPassword: data.get('confirmPassword'),
      phone: data.get('tel'),
      address: data.get('address'),
      address_detail: data.get('extraAddr'),
      birthday: data.get('birth')
    };
    console.log(joinData);
    const {
      email,
      name,
      nickname,
      password,
      confirmPassword,
      phone,
      address,
      address_detail,
      birthday
    } = joinData;

    // 이름 유효성 검사
    const nameRegex = /^[가-힣a-zA-Z]+$/;
    if (!nameRegex.test(name) || name.length < 1) {
      setNameError(`${t('nameError')}`);
    } else {
      setNameError('');
    }

    // 비밀번호 같은지 체크
    if (password !== confirmPassword) {
      setPasswordError(`${t('confirmPasswordError')}`);
    } else {
      setPasswordError('');
    }

    if (!nameError && !passwordError) {
      await axios
        .post('/api/auth/signup/stock', {
          name,
          nickname,
          email,
          password,
          phone,
          address,
          address_detail,
          birthday
        })
        .then(response => {
          console.log(response.data);
          console.log('회원가입완료');
          navigate('/signin', { replace: true });
        })
        .catch(error => {
          console.log(error);
          console.log('회원가입 불가');
        });
    }
  };
  // post 모달 창 open/close
  const postClickOpen = () => {
    setPostModalOpen(true);
  };
  const postHandleClose = () => {
    setPostModalOpen(false);
  };

  //약관동의 모달 창 open/close
  const handleClickOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  // Daum PostCode
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setTfValue(fullAddress);
  };
  return (
    <Container>
      <Box className="box">
        <Typography variant="h4" gutterBottom>
          StockBox
        </Typography>
        <Typography variant="h6">{t('join')}</Typography>
        <Box sx={{ width: '23%' }}>
          <LinearProgress />
        </Box>
        <Form onSubmit={submitHanddler} noValidate>
          <TextField
            label={t('name')}
            name="name"
            variant="standard"
            autoFocus
            required
            fullWidth
            onChange={nameChangeHanddler}
          />
          <FormHelperText sx={{ color: 'red' }}>{nameError}</FormHelperText>
          <FormControl sx={{ width: '100%' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-nickname">{t('nickname')} *</InputLabel>
            <Input
              id="standard-adornment-nickname"
              required
              name="nickname"
              onChange={nicknameChangeHanddler}
              error={nicknameError !== ''}
              endAdornment={
                <InputAdornment position="end">
                  {nicknameDbcheckState ? (
                    <CheckCircleOutlineIcon className="dbcheck-success-icon" color="success" />
                  ) : btnLoading ? (
                    <LoadingButton className="check-button" loading variant="outlined" size="small">
                      {t('dbcheck')}
                    </LoadingButton>
                  ) : (
                    <Button
                      className="check-button"
                      variant="outlined"
                      size="small"
                      onClick={nicknameDbcheckHandler}
                      disabled={nicknameBtn}
                    >
                      {t('dbcheck')}
                    </Button>
                  )}
                </InputAdornment>
              }
            />
            <FormHelperText id="nicknameRule-helper-text">{t('nicknameRule')}</FormHelperText>
          </FormControl>
          <FormHelperText sx={{ color: 'red' }}>{nicknameError}</FormHelperText>
          <FormControl sx={{ mt: -0.4, width: '100%' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-email">{t('email')} *</InputLabel>
            <Input
              id="standard-adornment-email"
              required
              name="email"
              onChange={emailChangeHanddler}
              error={emailError !== ''}
              type="email"
              endAdornment={
                <InputAdornment position="end">
                  {emailDbcheckState ? (
                    <CheckCircleOutlineIcon className="dbcheck-success-icon" color="success" />
                  ) : btnLoading ? (
                    <LoadingButton className="check-button" loading variant="outlined" size="small">
                      {t('dbcheck')}
                    </LoadingButton>
                  ) : (
                    <Button
                      className="check-button"
                      variant="outlined"
                      size="small"
                      onClick={emailDbcheckHandler}
                      disabled={emailBtn}
                    >
                      {t('dbcheck')}
                    </Button>
                  )}
                </InputAdornment>
              }
            />
          </FormControl>
          <FormHelperText sx={{ color: 'red' }}>{emailError}</FormHelperText>
          <FormControl sx={{ width: '100%' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">{t('password')} *</InputLabel>
            <Input
              id="standard-adornment-password"
              required
              name="password"
              onChange={passwordChangeHanddler}
              color={passwordState ? 'success' : 'primary'}
              error={passwordError !== '' || false}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText id="passwordRule-helper-text">{t('passwordRegex')}</FormHelperText>
            <FormHelperText sx={{ color: 'green' }}>
              {passwordState && `${t('passworkOk')}`}
            </FormHelperText>
          </FormControl>
          <FormControl sx={{ width: '100%' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-confirmPassword">
              {t('confirmPassword')} *
            </InputLabel>
            <Input
              id="standard-adornment-confirmPassword"
              required
              name="confirmPassword"
              onChange={confirmPasswordChangeHanddler}
              type={showPassword ? 'text' : 'password'}
              error={passwordError !== '' || false}
            />
            <FormHelperText sx={{ color: 'red' }}>{passwordError}</FormHelperText>
          </FormControl>
          <TextField label={t('tel')} name="tel" variant="standard" type="tel" fullWidth />
          <FormControl sx={{ width: '100%' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-fullAddress">{t('address')} </InputLabel>
            <Input
              readOnly
              id="standard-adornment-fullAdress"
              required
              placeholder={String(t('adressBtnInfo'))}
              name="address"
              value={tfValue}
              endAdornment={
                <InputAdornment position="end">
                  <Button
                    className="check-button"
                    variant="outlined"
                    size="small"
                    onClick={postClickOpen}
                  >
                    {t('searchPost')}
                  </Button>
                  <Dialog
                    fullWidth
                    open={postModalOpen}
                    onClose={postHandleClose}
                    aria-labelledby="title"
                  >
                    <DialogTitle id="title">{t('searchPost')}</DialogTitle>
                    <Divider />
                    <DialogContent>
                      <DaumPostcodeEmbed onComplete={handleComplete} onClose={postHandleClose} />
                    </DialogContent>
                  </Dialog>
                </InputAdornment>
              }
            />
          </FormControl>
          <TextField
            sx={{ mb: 1 }}
            label={t('extraAddr')}
            name="extraAddr"
            error={Boolean(extraAddrError)}
            onChange={extraAddrHandler}
            variant="standard"
            size="small"
          />
          <FormHelperText sx={{ color: 'red' }}>{extraAddrError}</FormHelperText>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={t('birth')}
              value={value}
              onChange={newValue => {
                setValue(newValue);
              }}
              renderInput={params => <TextField {...params} name="birth" />}
            />
          </LocalizationProvider>
          <div>
            <Button
              variant="text"
              color={checked ? 'success' : 'info'}
              onClick={handleClickOpen}
              fullWidth
            >
              {t('checkTerms')}
            </Button>
            <Dialog
              open={modalOpen}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{t('terms')}</DialogTitle>
              <Divider />
              <DialogContent>
                <DialogContentText id="usage terms">
                  <Terms />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={disagreeHanddler} aria-valuetext="">
                  {t('disagree')}
                </Button>
                <Button onClick={agreeHanddler} autoFocus aria-valuetext="1">
                  {t('agree')}
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <Button
            className="submit-button"
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={submitPossible}
          >
            {t('signup')}
          </Button>
        </Form>
      </Box>
    </Container>
  );
};

export default SignUp;
