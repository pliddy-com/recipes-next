import { FC } from 'react';

import Box from '@mui/material/Box';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const LogoIcon: FC<SvgIconProps> = () => {
  return (
    <Box role="graphics-symbol" data-testid="logo-svg" aria-label="logo">
      <SvgIcon>
        <path
          d="M6.8 22.852c-.036-1.96-.059-1.997-1.522-2.461-.707-.224-1.387-.486-1.512-.583-.672-.518-1.202-2.32-1.648-5.6-.271-1.991-.38-2.218-1.07-2.223-.397-.002-1.142-.763-.985-1.006.052-.08.238-.144.414-.144.263 0 .34-.169.428-.944.44-3.857 2.749-7.04 6.344-8.747C11.94-1.083 17.392.132 20.755 4.157c1.394 1.668 2.338 4.044 2.344 5.898.003.722.035.78.431.78.303 0 .429.089.429.302 0 .381-.523.845-.956.848-.181.002-.424.06-.538.13-.12.072-.363 1.172-.564 2.542-.402 2.744-.866 4.359-1.419 4.937-.216.226-.897.553-1.579.76-.66.198-1.296.478-1.414.62-.132.16-.214.779-.214 1.622 0 1.228-.032 1.363-.325 1.363-.285 0-.339-.178-.446-1.47l-.121-1.468-.54.115c-.703.151-6.89.15-7.596 0l-.544-.117-.107 1.1c-.152 1.552-.233 1.84-.522 1.84-.197 0-.258-.248-.274-1.107zm11.031-10.457c2.178-.273 3.5-.658 3.793-1.106.288-.438-.149-.733-1.61-1.09-3.701-.903-11.387-.945-15.675-.085-1.353.271-1.974.593-1.974 1.022 0 1.313 9.12 2.055 15.466 1.26zM3.087 9.866c2.183-.719 4.071-.91 8.96-.91 3.739 0 4.953.057 6.317.297 1.944.343 3.462.809 3.913 1.199.172.15.358.228.413.175.158-.15-.247-2.354-.618-3.364-1.285-3.5-4.546-6.014-8.578-6.613C7.72-.207 1.926 4.096 1.547 9.522c-.084 1.211-.08 1.226.25.945.184-.157.764-.428 1.29-.6z"
          fill="#fff"
        />
      </SvgIcon>
    </Box>
  );
};

export default LogoIcon;
