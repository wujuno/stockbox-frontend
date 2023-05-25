import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';

const Terms = () => {
  const { t } = useTranslation('terms');
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Stack direction="row" spacing={1}>
            <Typography>{t('Agreement to Terms of Use')}</Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ height: 200, overflowY: 'auto' }}>
            <Typography mb={1}>{t('Chapter 1. General Provisions')}</Typography>
            <Typography variant="subtitle2">
              {t('article1')}
              <br />
              {t('article2')}
              <br />
              {t('article3')}
              <br />
              {t('article4')}
            </Typography>
            <Typography mt={1} mb={1}>
              {t('Chapter 2. Membership Registration and Management')}
            </Typography>
            <Typography variant="subtitle2">
              {t('article5')}
              <br />
              {t('article6')}
              <br />
              {t('article7')} <br />
              {t('article8')}
              <br />
              {t('article9')}
              <br />
            </Typography>
            <Typography mt={1} mb={1}>
              {t('Chapter 3. Service Usage Agreement')}
            </Typography>
            <Typography variant="subtitle2">
              {t('article10')}
              <br />
              {t('article11')}
              <br />
              {t('article12')}
              <br />
              {t('article13')}
              <br />
              {t('article14')}
              <br />
              {t('article15')}
              <br />
              {t('article16')}
              <br />
              {t('article17')}
            </Typography>
            <Typography mt={1} mb={1}>
              {t('Chapter 4. Obligations of the Contracting Parties')}
            </Typography>
            <Typography variant="subtitle2">
              {t('article18')}
              <br />
              {t('article19')}
              <br />
              {t('article20')}
              <br />
              {t('article21')}
              <br />
              {t('article22')}
            </Typography>
            <Typography mt={1} mb={1}>
              {t('Chapter 5. Termination of Contract and Restriction of Use')}
            </Typography>
            <Typography variant="subtitle2">{t('article23')}</Typography>
            <Typography mt={1} mb={1}>
              {t('Chapter 6. Compensation for Damages, etc')}
            </Typography>
            <Typography variant="subtitle2">
              {t('article24')}
              <br />
              {t('article25')}
              <br />
              {t('article26')}
              <br />
              {t('Supplementary Provision')}
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1b-content"
          id="panel1b-header"
        >
          <Stack direction="row" spacing={1}>
            <Typography>{t('Consent to Collection and Use of Personal Information')}</Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ height: 200, overflowY: 'auto' }}>
            <Typography mb={1}>
              {t('Privacy Policy')}
              <br />
              <br /> [{t('Table of Contents')}]
              <br /> 1. {t('General Provisions')}
              <br /> 2. {t('Consent to Collection of Personal Information')}
              <br />
              3. {t('Purpose of Collection and Use of Personal Information')}
              <br /> 4. {t('Personal Information Items Collected')} <br />
              5.{' '}
              {t(
                'Installation, Operation, and Refusal of Automatic Personal Information Collection Devices'
              )}{' '}
              <br />
              6. {t('Provision of Personal Information to Third Parties and Unauthorized Use')}
              <br /> 7. {t('Access to and Correction of Personal Information')} <br />
              8.{' '}
              {t(
                'Withdrawal of Consent to Collection, Use, and Provision of Personal Information'
              )}{' '}
              <br />
              9. {t('Retention and Use Period of Personal Information')} <br />
              10. {t('Procedures and Methods for Destruction of Personal Information')}
              <br /> 11. {t('Technical Measures for Protection of Personal Information')}
              <br /> 12. {t('Outsourcing of Personal Information Processing')}
              <br /> 13. {t('Consultation and Complaints Handling')}
              <br /> 14. {t('Supplementary Provisions (Effective Date)')}
            </Typography>
            <Typography mb={1}>1. {t('General Provisions')}</Typography>
            <Typography variant="subtitle2">
              {t('pI1-header')} <br />
              1) {t('pI1-contents1')}
              <br />
              2) {t('pI1-contents2')}
              <br />
              3) {t('pI1-contents3')}
              <br />
              4) {t('pI1-contents4')}
              <br />
              5) {t('pI1-contents5')}
            </Typography>
            <Typography mt={1} mb={1}>
              2. {t('Consent to Collection of Personal Information')}
            </Typography>
            <Typography variant="subtitle2">{t('pI2-content')}</Typography>
            <Typography mt={1} mb={1}>
              3. {t('Purpose of Collection and Use of Personal Information')}
            </Typography>
            <Typography variant="subtitle2">
              {t('pI3-header')}
              <br />
              {t('pI3-contents1')}
              <br />
              {t('pI3-contents2')}
              <br />
              {t('pI3-contents3')}
              <br />
              {t('pI3-contents4')}
              <br />
              {t('pI3-contents5')}
            </Typography>
            <Typography mt={1} mb={1}>
              4. {t('Personal Information Items Collected')}
            </Typography>
            <Typography variant="subtitle2">
              {t('pI4-header')} <br />
              1) {t('pI4-contents1')}
              <br />
              2) {t('pI4-contents2')}
            </Typography>
            <Typography mt={1} mb={1}>
              5.{' '}
              {t(
                'Installation, Operation, and Refusal of Automatic Personal Information Collection Devices'
              )}
            </Typography>
            <Typography variant="subtitle2">
              {t('pI5-header')}
              <br />
              1) {t('pI5-contents1')}
              <br />
              2) {t('pI5-contents2')}
              <br />
              3) {t('pI5-contents3')}
              <br />
              {t('pI5-contents4')}
            </Typography>
            <Typography mt={1} mb={1}>
              6. {t('Provision of Personal Information to Third Parties and Unauthorized Use')}
            </Typography>
            <Typography variant="subtitle2">
              {t('pI6-header1')}
              <br />
              {t('pI6-header2')}
              <br />
              1) {t('pI6-contents1')}
              <br />
              2) {t('pI6-contents2')}
            </Typography>
            <Typography mt={1} mb={1}>
              7. {t('Access to and Correction of Personal Information')}
            </Typography>
            <Typography variant="subtitle2">
              {t('pI7-header1')}
              <br />
              {t('pI7-header2')}
            </Typography>
            <Typography mt={1} mb={1}>
              8.{' '}
              {t('Withdrawal of Consent to Collection, Use, and Provision of Personal Information')}
            </Typography>
            <Typography variant="subtitle2">
              {t('pI8-contents1')}
              <br />
              {t('pI8-contents2')}
              <br />
              {t('pI8-contents3')}
            </Typography>
            <Typography mt={1} mb={1}>
              9. {t('Retention and Use Period of Personal Information')}
            </Typography>
            <Typography variant="subtitle2">
              {t('pI9-header1')}
              <br />
              1) {t('pI9-contents1')}
              <br />
              2) {t('pI9-contents2')}
              <br />
              3) {t('pI9-contents3')}
              <br />
              {t('pI9-contents4')}
              <br />
              {t('pI9-contents5')}
              <br />
              {t('pI9-contents6')}
              <br />
              {t('pI9-contents7')}
              <br />
              {t('pI9-contents8')}
            </Typography>
            <Typography mt={1} mb={1}>
              10. {t('Procedures and Methods for Destruction of Personal Information')}
            </Typography>
            <Typography variant="subtitle2">
              {t('pI10-header1')}
              <br />
              {t('pI10-contents1')}
              <br />
              {t('pI10-contents2')}
            </Typography>
            <Typography mt={1} mb={1}>
              11. {t('Technical Measures for Protection of Personal Information')}
            </Typography>
            <Typography variant="subtitle2">
              {t('pI11-header1')}
              <br />
              {t('pI11-contents1')}
              <br />
              {t('pI11-contents2')}
              <br />
              {t('pI11-contents3')}
            </Typography>
            <Typography mt={1} mb={1}>
              12. {t('Outsourcing of Personal Information Processing')}
            </Typography>
            <Typography variant="subtitle2">
              {t('pI12-contents1')}
              <br />
              {t('pI12-contents2')}
              <br />
              {t('pI12-contents3')}
            </Typography>
            <Typography mt={1} mb={1}>
              13. {t('Consultation and Complaints Handling')}
            </Typography>
            <Typography variant="subtitle2">
              {t('pI13-header1')}
              <br />
              1) {t('pI13-contents1')}
              <br />
              2) {t('pI13-contents2')}
              <br />
              3) {t('pI13-contents3')}
              <br />
              {t('pI13-contents4')} <br />
              {t('pI13-contents5')}
              <br />
              {t('pI13-contents6')} <br />
              <br />
              {t('pI13-contents7')}
              <br />
              {t('pI13-contents8')}
              <br />
              {t('pI13-contents9')}
              <br />
              {t('pI13-contents10')}
              <br />
              {t('pI13-contents11')}
            </Typography>
            <Typography mt={1} mb={1}>
              14. {t('Supplementary Provisions (Effective Date)')}
            </Typography>
            <Typography variant="subtitle2">
              {t('pI14-header1')}
              <br />
              1) {t('pI14-contents1')}
              <br />
              2) {t('pI14-contents2')}
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Terms;
