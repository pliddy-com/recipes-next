import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import EditIcon from '@mui/icons-material/edit';

import { Maybe, Scalars } from 'types/queries';

import { useAuthContext } from 'contexts/Authentication';

interface NotesProps {
  notes?: Maybe<Array<Maybe<Scalars['String']>>>;
}

const Notes = ({ notes }: NotesProps) => {
  const { isAuth } = useAuthContext();

  return notes ? (
    <Box className="notes">
      <Stack className="recipe-header sub">
        <Typography variant="h2">Notes</Typography>
        {isAuth && (
          <Box className="edit-box">
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
