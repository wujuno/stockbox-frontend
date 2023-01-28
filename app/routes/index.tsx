import { Page } from '@/components/Layout';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const { t } = useTranslation();

  return (
    <Page>
      <Typography variant="h3">{t('hello')}</Typography>
    </Page>
  );
};

export default Index;
