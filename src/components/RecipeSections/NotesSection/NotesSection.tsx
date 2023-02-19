import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Maybe, Scalars } from 'types/queries';

interface NotesProps {
  notes?: Maybe<Array<Maybe<Scalars['String']>>>;
}

const Notes = ({ notes }: NotesProps) =>
  notes ? (
    <Box>
      <Typography variant="h2">Notes</Typography>
      {notes && (
        <ul>
          {notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      )}
    </Box>
  ) : null;

export default Notes;
