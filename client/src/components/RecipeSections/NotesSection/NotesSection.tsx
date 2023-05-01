import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import EditIcon from '@mui/icons-material/edit';

import { Maybe, Scalars } from 'types/queries';

import { useAuthContext } from 'contexts/Authentication';

import colors from 'theme/values/colors';
import Button from '@mui/material/Button';

interface NotesProps {
  notes?: Maybe<Array<Maybe<Scalars['String']>>>;
}

const Notes = ({ notes }: NotesProps) => {
  const { isAuth } = useAuthContext();

  return notes ? (
    <Box className="notes">
      <Stack
        direction="row"
        flex="true"
        sx={{ justifyContent: 'space-between' }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            flexGrow: 1
          }}
        >
          Notes
        </Typography>
        {isAuth && (
          <Box
            sx={{
              alignItems: 'center',
              borderBottom: `1px solid ${colors.secondary.main}`,
              display: 'flex',
              marginBottom: '8.5px'
            }}
          >
            <Button variant="text" startIcon={<EditIcon />} className="edit">
              Edit
            </Button>
          </Box>
        )}
      </Stack>

      {notes && (
        <ul>
          {notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      )}
    </Box>
  ) : null;
};
export default Notes;
