/* istanbul ignore file */
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';

import { connectSearchBox } from 'react-instantsearch-dom';
import { SearchBoxProvided } from 'react-instantsearch-core';

const MuiSearchBox = ({ currentRefinement, refine }: SearchBoxProvided) => (
  <Paper
    action=""
    component="form"
    role="search"
    square
    variant="outlined"
    sx={{
      p: '2px 4px',
      mb: '2rem',
      display: 'flex',
      alignItems: 'center',
      maxWidth: '400px'
    }}
  >
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      placeholder="Search…"
      inputProps={{ 'aria-label': 'search recipes' }}
      value={currentRefinement}
      onChange={(e) => refine(e.currentTarget.value)}
      autoComplete="false"
    />
    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
      <SearchIcon />
    </IconButton>
  </Paper>
);

const CustomSearchBox = connectSearchBox(MuiSearchBox);

const SearchBox = () => <CustomSearchBox />;

export default SearchBox;
