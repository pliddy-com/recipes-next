/* istanbul ignore file */
import Paper from '@mui/material/Paper';

import SearchIcon from '@mui/icons-material/Search';

import {
  useCurrentRefinements,
  useSearchBox,
  UseSearchBoxProps
} from 'react-instantsearch-hooks-web';

import { InputAdornment, TextField } from '@mui/material';

const queryHook: UseSearchBoxProps['queryHook'] = (query, search) => {
  search(query);
};

const SearchBox = () => {
  const searchBoxApi = useSearchBox({
    queryHook
  });

  const refinements = useCurrentRefinements();

  return (
    <Paper
      action=""
      className="search"
      component="form"
      elevation={0}
      onSubmit={(e) => {
        e.preventDefault();
      }}
      role="search"
      square
    >
      <TextField
        autoComplete="false"
        fullWidth
        InputProps={{
          'aria-label': 'search recipes',
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          )
        }}
        onChange={(e) => searchBoxApi.refine(e.currentTarget.value)}
        placeholder="Search recipes…"
        size="small"
        value={refinements.items[0]}
        variant="outlined"
      />
    </Paper>
  );
};

export default SearchBox;
