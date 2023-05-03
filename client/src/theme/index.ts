import { deepmerge } from '@mui/utils';
import { createTheme } from '@mui/material/styles';

import baseTheme from 'theme/base';
import buttonThemeOptions from 'theme/button';
import cardThemeOptions from 'theme/card';
import dialogThemeOptions from 'theme/dialog';
import formThemeOptions from './form';
import listThemeOptions from 'theme/list';
import menuThemeOptions from 'theme/menu';
import navbarThemeOptions from 'theme/navbar';
import pageThemeOptions from 'theme/page';
import tagThemeOptions from 'theme/tag';
import typeThemeOptions from 'theme/type';

let build = createTheme(deepmerge(baseTheme, typeThemeOptions));
build = createTheme(deepmerge(build, buttonThemeOptions));
build = createTheme(deepmerge(build, cardThemeOptions));
build = createTheme(deepmerge(build, dialogThemeOptions));
build = createTheme(deepmerge(build, formThemeOptions));
build = createTheme(deepmerge(build, listThemeOptions));
build = createTheme(deepmerge(build, menuThemeOptions));
build = createTheme(deepmerge(build, navbarThemeOptions));
build = createTheme(deepmerge(build, pageThemeOptions));
build = createTheme(deepmerge(build, tagThemeOptions));

// const theme = responsiveFontSizes(build);

export default build;
