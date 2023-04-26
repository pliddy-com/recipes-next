import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

interface ILoading {
  className?: string;
}

import { forwardRef } from 'react';

const Loading = forwardRef(function Loading({ className }: ILoading, ref) {
  return (
    <Container className={`loading${className ? ` ${className}` : ''}`}>
      <CircularProgress
        ref={ref}
        color="primary"
        aria-label="spinner"
        role="graphics-symbol"
      />
    </Container>
  );
});

// const Loading = ({ className }: ILoading) => (
//   <Container className={`loading${className ? ` ${className}` : ''}`}>
//     <CircularProgress
//       color="primary"
//       aria-label="spinner"
//       role="graphics-symbol"
//     />
//   </Container>
// );

export default Loading;
