import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ButtonBase, Stack, Typography, useTheme } from '@mui/material';
import config from 'config';
import logo from '../../assets/images/icons/produck-logo.png';
import { AlertOutlined } from '@ant-design/icons';

const LogoSection = ({ sx, to }) => {
  const theme = useTheme();

  return (
    <ButtonBase
      disableRipple
      component={Link}
      to={to || config.defaultPath}
      sx={{
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        ...sx
      }}
    >
      <Stack direction="row" alignItems="center">
        <img src={logo} alt="proDuck Logo" width="56" />
        <Stack direction="column">
          <Typography variant="h4" color={theme.palette.primary.main} sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700 }}>
            proDuck
          </Typography>
          <Typography variant="caption" component="span" color={theme.palette.text.secondary} sx={{ fontSize: '0.5rem' }}>
            {import.meta.env.VITE_APP_VERSION}
          </Typography>
        </Stack>
      </Stack>

      <Stack className="ms-3" direction="row" spacing={1} alignItems="end">
        <Stack direction="column" spacing={0.5} alignItems="flex-start">
          <Typography
            variant="body1"
            component="span"
            color={theme.palette.warning.main}
            sx={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 500,
              lineHeight: 1,
              fontSize: '1.2rem',
              backgroundColor: theme.palette.background.paper,
              alignItems: 'center',
              textDecoration: 'underline'
            }}
          >
            <AlertOutlined className="me-1" />
            WMS
          </Typography>
        </Stack>
      </Stack>
    </ButtonBase>
  );
};

LogoSection.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string
};

export default LogoSection;
