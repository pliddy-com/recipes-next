import { deepmerge } from '@mui/utils';
import { createTheme } from '@mui/material/styles';

import baseTheme from 'theme/base';
import buttonThemeOptions from 'theme/button';
import cardThemeOptions from 'theme/card';
import containerThemeOptions from 'theme/container';
import drawerThemeOptions from 'theme/drawer';
import listThemeOptions from 'theme/list';
import tagThemeOptions from 'theme/tag';
import typeThemeOptions from 'theme/type';

let build = createTheme(deepmerge(baseTheme, typeThemeOptions));
build = createTheme(deepmerge(build, buttonThemeOptions));
build = createTheme(deepmerge(build, cardThemeOptions));
build = createTheme(deepmerge(build, containerThemeOptions));
build = createTheme(deepmerge(build, drawerThemeOptions));
build = createTheme(deepmerge(build, listThemeOptions));
build = createTheme(deepmerge(build, tagThemeOptions));

// const theme = responsiveFontSizes(build);

export default build;
