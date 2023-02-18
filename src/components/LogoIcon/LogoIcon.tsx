import { FC } from 'react';

import Box from '@mui/material/Box';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const LogoIcon: FC<SvgIconProps> = () => (
  <Box role="graphics-symbol" data-testid="logo" aria-label="logo">
    <SvgIcon>
      <path
        d="M12.047 8c-4.906 0-8.248.82-8.715 1.012-.467.19-1.116.3-1.57.597-.448.447-.929.384-1.323.393-.179.002-.365.069-.418.154-.157.26.59 1.072.989 1.074.692.006.802.248 1.074 2.372.448 3.498.978 5.418 1.652 5.97.126.104.808.384 1.518.623 1.468.495 1.491.533 1.527 2.623.016.916.078 1.182.276 1.182.29 0 .37-.308.523-1.963l.107-1.172.547.123c.709.16 6.916.161 7.621 0l.543-.12.122 1.564c.107 1.377.16 1.568.447 1.568.294 0 .326-.144.326-1.453 0-.9.082-1.56.215-1.73.118-.152.756-.452 1.418-.663.684-.22 1.369-.57 1.586-.81.555-.617 1.02-2.338 1.424-5.264.201-1.461.444-2.634.564-2.71.114-.076.36-.137.541-.14.435-.003.959-.498.959-.904 0-.227-.127-.323-.43-.324-.39-.008-.708.06-1.258-.406-.452-.416-2.265-.985-3.908-1.242C17.144 8.188 15.8 8 12.047 8Zm.312.705c2.663.015 5.259.244 6.946.682 1.332.346 1.729.632 1.466 1.056-.267.434-1.471.808-3.457 1.073-5.785.77-14.1.051-14.1-1.221 0-.416.566-.728 1.8-.99 1.954-.417 4.683-.615 7.345-.6Z"
        style={{ color: '#fff' }}
      />
    </SvgIcon>
  </Box>
);

export default LogoIcon;
