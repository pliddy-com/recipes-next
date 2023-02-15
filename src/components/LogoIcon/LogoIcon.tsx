import { FC } from 'react';

import Box from '@mui/material/Box';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const LogoIcon: FC<SvgIconProps> = () => (
  <Box role="graphics-symbol" data-testid="logo" aria-label="logo">
    <SvgIcon>
      <path
        d="M22.856 51.219H21.01c-.078-1.327-2.497-2.855-5.85-3.456v-.025c0-.826-1.379-1.452-3.2-1.452-1.82 0-3.197.626-3.197 1.428v.025c-3.38.625-5.799 2.128-5.85 3.455H1.117c-.624 0-1.118.5-1.118 1.077v.375c0 .601.494 1.077 1.118 1.077h2.314l1.404 6.385c0 .05.026.075.052.1 1.196 1.427 4.42 2.078 7.099 2.078 2.678 0 5.902-.65 7.098-2.078a.188.188 0 0 0 .052-.1l1.404-6.385h2.34c.625 0 1.119-.476 1.119-1.077v-.35a1.13 1.13 0 0 0-1.144-1.077zm-2.366.2c-.26 1.177-3.589 2.43-8.53 2.43h-.91c-4.42-.151-7.358-1.303-7.618-2.38l-.026-.2c.026-1.027 2.262-2.454 5.539-3.03.442.551 1.586.902 2.99.902 1.404 0 2.548-.376 2.99-.902 3.302.576 5.538 2.028 5.538 3.03z"
        transform="translate(0 -42.286)"
      />
      <path
        d="M18.461 50.743c-3.302 2.179-9.854 2.179-13.027 0-.13-.075-.286-.05-.364.05-.078.126-.052.276.052.35 1.69 1.178 4.213 1.754 6.761 1.754s5.096-.576 6.865-1.753c.13-.075.182-.225.103-.35-.078-.126-.234-.176-.364-.1 0 .024 0 .024-.026.05z"
        transform="translate(0 -42.286)"
      />
      <path
        d="M11.935 51.044c1.82 0 3.64-.426 4.888-1.252.13-.075.156-.226.078-.35-.078-.126-.234-.151-.364-.076-2.288 1.527-6.89 1.527-9.1 0-.13-.075-.286-.05-.364.05-.078.125-.053.276.052.35 1.196.852 2.99 1.278 4.81 1.278z"
        transform="translate(0 -42.286)"
      />
    </SvgIcon>
  </Box>
);

export default LogoIcon;
