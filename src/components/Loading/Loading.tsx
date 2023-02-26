import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => (
  <Container className="loading">
    <CircularProgress
      color="primary"
      aria-label="spinner"
      role="graphics-symbol"
    />
  </Container>
);

export default Loading;
