import styled from '@emotion/styled';
import { IconButton, Theme, Tooltip } from '@mui/material';
import { useNavigate } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

interface SideBarProps {
  theme?: Theme;
}

const Container = styled.div<{ muiTheme?: Theme }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  gap: 5px;
  width: 60px;
  height: 100%;
  background-color: ${({ muiTheme }) => muiTheme?.palette.divider ?? 'inherit'};

  .side-bar-btn {
    .side-bar-icon {
      width: 32px;
      height: 32px;
    }
  }
`;

const SideBar = ({ className, style, theme }: DefaultProps & SideBarProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Container className={className} muiTheme={theme} style={style}>
      <Tooltip title={t('home')} placement="right">
        <IconButton className="side-bar-btn" onClick={() => navigate('/')}>
          <HomeIcon className="side-bar-icon" />
        </IconButton>
      </Tooltip>
      <Tooltip title={t('board')} placement="right">
        <IconButton className="side-bar-btn" onClick={() => navigate('/board')}>
          <AssignmentIcon className="side-bar-icon" />
        </IconButton>
      </Tooltip>
      <Tooltip title={t('pairtrading')} placement="right">
        <IconButton className="side-bar-btn" onClick={() => navigate('/pairtrading')}>
          <CompareArrowsIcon className="side-bar-icon" />
        </IconButton>
      </Tooltip>
    </Container>
  );
};

export default SideBar;
