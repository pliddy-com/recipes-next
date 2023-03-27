import {
  useCurrentRefinements,
  useSearchBox,
  UseSearchBoxProps
} from 'react-instantsearch-hooks-web';

import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

import SearchIcon from '@mui/icons-material/Search';

/* istanbul ignore next */
const queryHook: UseSearchBoxProps['queryHook'] = (query, search) => {
  search(query);
};

const SearchBox = () => {
  const { refine } = useSearchBox({
    queryHook
  });

  const refinements = useCurrentRefinements();

  return (
    <Paper
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
        autoFocus={true}
        fullWidth
        inputProps={{ 'aria-label': 'search' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          )
        }}
        id="search"
        name="search"
        onChange={(e) => refine(e.currentTarget.value)}
        placeholder="Search recipes…"
        size="small"
        value={refinements.items[0]}
        variant="outlined"
      />
    </Paper>
  );
};

export default SearchBox;
