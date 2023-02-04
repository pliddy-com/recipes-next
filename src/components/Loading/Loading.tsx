import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { centeredChild } from 'lib/styles';

const Loading = () => (
  <Container sx={centeredChild.wrapper}>
    <Box sx={centeredChild.content}>
      <CircularProgress color="primary" />
    </Box>
  </Container>
);

export default Loading;
