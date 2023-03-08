import React, { useEffect, useRef, useState } from 'react';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import { v4 as uuidV4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { Form, useActionData, useSubmit } from '@remix-run/react';
import countryCodes from '@/config/countryCodes.json';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;

  .success-helper-text {
    color: ${({ theme }) => (theme === 'light' ? '#0c9131' : '#0ed145')};
  }

  .refresh-auth-btn {
    margin-top: 7px;

    .reset-auth-icon {
      fill: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
    }
  }
`;

const SMS: React.FC<DefaultProps> = props => {
  const { className, style } = props;

  const actionData = useActionData();

  const [countryCode, setCountryCode] = useState(82);
  const [phone, setPhone] = useState('');

  const { t, i18n } = useTranslation('common');
  const submit = useSubmit();

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    console.log('SMS:::', actionData);
  }, [actionData]);

  return (
    <Container className={className} style={style}>
      <Select
        value={countryCode}
        renderValue={value => `+${value}`}
        // disabled={isSmsSend || isValidPhone}
        // MenuProps={{ className: theme === 'light' ? 'scroll-bar' : 'scroll-bar-dark' }}
        onChange={e => setCountryCode(Number(e.target.value))}
        style={{ width: '85px' }}
      >
        {countryCodes.map(d => (
          <MenuItem key={uuidV4()} value={d.countryCode + ''}>
            {`+${d.countryCode} (${i18n.language === 'ko' ? d.country : d.countryEnglish})`}
          </MenuItem>
        ))}
      </Select>

      <TextField
        variant="outlined"
        // label={t('phoneNumberLabel')}
        value={phone}
        // error={inputInfo.phone.error}
        // helperText={typeof inputInfo.phone.helperText === 'string' ? t(inputInfo.phone.helperText) : inputInfo.phone.helperText}
        required
        // disabled={isSmsSend || isValidPhone}
        onChange={e => setPhone(e.target.value)}
        style={{ flex: 1 }}
      />

      <Button
        variant="contained"
        // disabled={isSmsSend || isValidPhone}
        onClick={() => formRef.current && submit(formRef.current)}
        style={{ height: '56px' }}
      >
        {t('verify')}
      </Button>
      {/* {!isValidPhone && (
      )}

      {isValidPhone && (
        <IconButton className="refresh-auth-btn" onClick={() => handleClickResetButton('phone')}>
          <ReplayRoundedIcon className="reset-auth-icon" />
        </IconButton>
      )} */}

      <Form ref={formRef} method="post" action="/?/sendSMS">
        <input type="hidden" name="phone" value={phone} />
        <input type="hidden" name="countryCode" value={countryCode} />
      </Form>
    </Container>
  );
};

export default SMS;
