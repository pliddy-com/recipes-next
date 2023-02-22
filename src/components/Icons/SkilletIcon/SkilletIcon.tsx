import { FC } from 'react';

import Box from '@mui/material/Box';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

import colors from 'theme/colors';

const SkilletIcon: FC<SvgIconProps> = () => (
  <Box role="graphics-symbol" data-testid="skillet" aria-label="skillet">
    <SvgIcon>
      <path
        d="M10.347 8.561c-1.187-1.07-3.385-3.086-4.354-4.19L2.859.59S1.886-.57.945.362L.696.608l-.25.247c-.94.93.207 1.916.207 1.916L4.4 5.946c1.094.982 3.084 3.202 4.141 4.401a8.54 8.54 0 1 0 1.807-1.786ZM2.185 2.75l-.974-.985a.446.446 0 1 1 .634-.626l.974.984a.446.446 0 1 1-.635.627z"
        style={{ color: colors.primary.main }}
      />
    </SvgIcon>
  </Box>
);

export default SkilletIcon;
