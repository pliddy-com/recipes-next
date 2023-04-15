import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';

import colors from 'theme/values/colors';

const SkilletIcon = () => (
  <Box
    role="graphics-symbol"
    data-testid="skillet"
    aria-label="skillet"
    className="icon"
  >
    <SvgIcon className="icon">
      <path
        d="M1.818.002c-.272-.018-.572.069-.867.36L.699.607l-.25.248c-.946.93.209 1.916.209 1.916l3.77 3.176c1.1.982 3.103 3.201 4.167 4.4a8.596 8.541 0 1 0 1.819-1.787C9.218 7.49 7.006 5.477 6.03 4.372L2.878.59S2.415.042 1.818.002zM1.741 1.23a.448.445 0 0 1 .317.133l.98.985a.449.446 0 1 1-.638.627l-.98-.985a.45.447 0 0 1 .32-.76Z"
        style={{ fill: colors.primary.main, stroke: 'none' }}
      />
    </SvgIcon>
  </Box>
);

export default SkilletIcon;
