import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { centeredChild } from 'lib/styles';

const Loading = () => (
  <Container sx={centeredChild.wrapper}>
    <Box aria-label="spinner" role="graphics-symbol" sx={centeredChild.content}>
      <CircularProgress color="primary" />
    </Box>
  </Container>
);

export default Loading;
