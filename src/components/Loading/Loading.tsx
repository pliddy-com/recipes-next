import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { loadingStyles } from 'lib/styles';

const Loading = () => (
  <Container sx={loadingStyles.loader}>
    <Box sx={loadingStyles.loaderContainer}>
      <CircularProgress color="primary" />
    </Box>
  </Container>
);

export default Loading;
