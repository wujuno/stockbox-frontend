import { useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { DataFunctionArgs, json } from '@remix-run/node';
import { Page } from '@/components/Layout';
import { loaderCommonInit } from '@/lib/loaderCommon';
import SMS from '@/components/SMS';

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

export const handle = {
  i18n: 'findAccount'
};

const Container = styled(Page)``;

const FindAccount = () => {
  const [tabNum, setTabNum] = useState(0);

  const { t } = useTranslation('findAccount');

  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabNum} onChange={(e, newTabNum) => setTabNum(newTabNum)} aria-label="find account tabs">
          <Tab label={t('findEmail')} />
          <Tab label={t('findPassword')} />
        </Tabs>
      </Box>
      {tabNum === 0 && (
        <Box>
          <Typography>Email</Typography>
          <SMS />
        </Box>
      )}
      {tabNum === 1 && (
        <Box>
          <Typography>Password</Typography>
        </Box>
      )}
    </Container>
  );
};

export default FindAccount;
