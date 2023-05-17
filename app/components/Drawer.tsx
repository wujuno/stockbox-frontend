import { useCallback, useContext } from 'react';
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Drawer,
  Toolbar,
  Typography
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

interface GlobalDrawerProps {
  open: boolean;
  onClose?: () => void;
}

const GlobalDrawer = ({ className, style, open, onClose }: DefaultProps & GlobalDrawerProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const movePage = useCallback(
    (to: string) => {
      onClose?.();
      navigate(to);
    },
    [onClose, navigate]
  );

  return (
    <Drawer
      className={`${className} global-drawer`}
      anchor="left"
      open={open}
      onClose={() => onClose?.()}
      style={style}
    >
      <Toolbar className="drawer-header drawer-item">
        <IconButton onClick={() => onClose?.()}>
          <ChevronLeftIcon width={24} height={24} />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        <ListItem className="drawer-item">
          <ListItemButton className="drawer-item-btn" onClick={() => movePage('/')}>
            <HomeIcon />
            <Typography>{t('home')}</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem className="drawer-item">
          <ListItemButton className="drawer-item-btn" onClick={() => movePage('/board')}>
            <AssignmentIcon />
            <Typography>{t('board')}</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem className="drawer-item">
          <ListItemButton className="drawer-item-btn" onClick={() => movePage('/pairtrading')}>
            <CompareArrowsIcon />
            <Typography>{t('pairtrading')}</Typography>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default GlobalDrawer;
