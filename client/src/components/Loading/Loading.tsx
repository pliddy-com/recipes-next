import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

interface ILoading {
  className?: string;
}

const Loading = ({ className }: ILoading) => (
  <Container className={`loading${className ? ` ${className}` : ''}`}>
    <CircularProgress
      color="primary"
      aria-label="spinner"
      role="graphics-symbol"
    />
  </Container>
);

export default Loading;
