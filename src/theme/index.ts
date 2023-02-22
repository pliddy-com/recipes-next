import { deepmerge } from '@mui/utils';
import { createTheme } from '@mui/material/styles';

import baseTheme from 'theme/theme';
import buttonTheme from 'theme/button';
import cardTheme from 'theme/card';
import containerTheme from 'theme/container';
import drawerTheme from 'theme/drawer';
import listTheme from 'theme/list';
import tagTheme from 'theme/tag';
import typeTheme from 'theme/type';

let build = createTheme(deepmerge(baseTheme, typeTheme));
build = createTheme(deepmerge(build, buttonTheme));
build = createTheme(deepmerge(build, cardTheme));
build = createTheme(deepmerge(build, containerTheme));
build = createTheme(deepmerge(build, drawerTheme));
build = createTheme(deepmerge(build, listTheme));
build = createTheme(deepmerge(build, tagTheme));

// const theme = responsiveFontSizes(build);

export default build;
