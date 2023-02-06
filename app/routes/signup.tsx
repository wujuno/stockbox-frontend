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
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  LinearProgress,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

const FormHelperTexts = styled(FormHelperText)`
  display: flex !important;
  justify-content: flex-start !important;
  color: red;
`;

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
`;

const SignUp = () => {
  const theme = useTheme();
  const [checked, setChecked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [emailState, setEmailState] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [confirmPasswordState, setConfirmPasswordState] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameState, setNameState] = useState('');
  const [nameError, setNameError] = useState('');
  const [nicknameState, setNicknameState] = useState(false);
  const [submitPossible, setSubmitPossible] = useState(true);
  const [value, setValue] = useState<Dayjs | null>(null);
  const { t } = useTranslation('signup');

  // 비밀번호 visible handdler
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  // 이름 변경 체크
  const nameChangeHanddler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameState(event.currentTarget.value);
  };
  // 별명 변경 체크
  const nicknameChangeHanddler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNicknameState(
      Boolean(event.currentTarget.value) &&
        event.currentTarget.value.length < 31
    );
  };
  // 이메일 유효성 체크
  const emailChangeHanddler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (!emailRegex.test(event.currentTarget.value)) {
      setEmailState('');
    } else {
      setEmailState('_');
    }
  };
  // 비밀번호 변경 체크
  const passwordChangeHanddler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordState(event.currentTarget.value);
  };
  // 확인 비밀번호 변경 체크
  const confirmPasswordChangeHanddler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPasswordState(event.currentTarget.value);
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
  // submit possible handdler
  useEffect(() => {
    setSubmitPossible(
      !(
        nameState &&
        nicknameState &&
        emailState &&
        passwordState &&
        confirmPasswordState &&
        checked
      )
    );
  }, [
    nameState,
    nicknameState,
    emailState,
    passwordState,
    confirmPasswordState,
    checked
  ]);

  // form Handdler
  const submitHanddler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const joinData = {
      name: String(data.get('name')),
      nickname: data.get('nickname'),
      email: String(data.get('email')),
      password: data.get('password'),
      confirmPassword: data.get('confirmPassword'),
      tel: data.get('tel'),
      adress: data.get('adress'),
      birth: data.get('birth')
    };
    console.log(joinData);
    const { email, name, password, confirmPassword, tel, adress, birth } =
      joinData;

    // 이름 유효성 검사
    const nameRegex = /^[가-힣a-zA-Z]+$/;
    if (!nameRegex.test(name) || name.length < 1) {
      setNameError(`${t('nameError')}`);
    } else {
      setNameError('');
    }
    // 별명 중복 검사

    // 이메일 유효성 검사
    const emailRegex =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (!emailRegex.test(email)) {
      setEmailError(`${t('emailError')}`);
    } else {
      setEmailError('');
    }
    // 비밀번호 같은지 체크
    if (password !== confirmPassword) {
      setPasswordError(`${t('confirmPasswordError')}`);
    } else {
      setPasswordError('');
    }
  };

  // 모달 창 open/close
  const handleClickOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
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
          <FormHelperTexts>{nameError}</FormHelperTexts>
          <TextField
            label={t('nickname')}
            name="nickname"
            variant="standard"
            helperText={t('nicknameRule')}
            required
            fullWidth
            onChange={nicknameChangeHanddler}
          />
          <TextField
            label={t('email')}
            name="email"
            variant="standard"
            type="email"
            required
            fullWidth
            onChange={emailChangeHanddler}
            error={emailError !== '' || false}
          />
          <FormHelperTexts>{emailError}</FormHelperTexts>
          <FormControl sx={{ m: 0, width: '100%' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              {t('password')} *
            </InputLabel>
            <Input
              id="standard-adornment-password"
              required
              name="password"
              onChange={passwordChangeHanddler}
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
          </FormControl>
          <FormControl sx={{ m: 0, width: '100%' }} variant="standard">
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
            <FormHelperTexts>{passwordError}</FormHelperTexts>
          </FormControl>
          <TextField
            label={t('tel')}
            name="tel"
            variant="standard"
            type="tel"
            fullWidth
          />
          <TextField
            sx={{ mb: 1 }}
            label={t('adress')}
            name="adress"
            variant="standard"
            type="adress"
            fullWidth
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={t('birth')}
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} name="birth" />}
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
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  제 1장 총칙 제 1 조(목적) 본 약관은 스톡박스 웹사이트(이하
                  "스톡박스")가 제공하는 모든 서비스(이하 "서비스")의 이용조건
                  및 절차, 회원과 스톡박스의 권리, 의무, 책임사항과 기타 필요한
                  사항을 규정함을 목적으로 합니다.
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
