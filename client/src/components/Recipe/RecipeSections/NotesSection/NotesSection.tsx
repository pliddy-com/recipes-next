import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface NotesProps {
  notes?: Array<string | null>;
}

const Notes = ({ notes }: NotesProps) => {
  return notes ? (
    <Box className="notes">
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
};
export default Notes;
