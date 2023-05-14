import { useState } from 'react';
import Typography from '@mui/material/Typography';

import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import CancelIcon from '@mui/icons-material/Cancel';

import PayloadRender from 'components/PayloadRender/PayloadRender';

interface IListEdit {
  label: string;
  list: (string | null)[];
  onChange(): void;
}
const ListEdit = ({ label, list, onChange }: IListEdit) => {
  const [values, setValues] = useState<(string | null)[]>(list);

  const updateValues = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();

    const valueString = e.target.value;
    const updatedValues = [...values];
    updatedValues[index] = valueString;
    setValues(updatedValues);

    onChange();
  };

  const moveUp = () => {
    console.log('move up');
  };

  const moveDown = () => {
    console.log('move down');
  };

  const removeItem = () => {
    console.log('remove item');
  };

  return (
    <Stack direction="column" className="listEdit">
      <Typography variant="h2">{label}</Typography>
      {values.map((value, index) => (
        <FormControl
          sx={{ m: 1, width: '25ch' }}
          variant="outlined"
          key={`${label}-${index}`}
        >
          <InputLabel htmlFor={`${label.toLowerCase()}`}>{`${label} ${
            index + 1
          }`}</InputLabel>
          <OutlinedInput
            className="field"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="move item up"
                  disabled={index === 0}
                  edge="end"
                  onClick={moveUp}
                >
                  <ArrowCircleUpIcon />
                </IconButton>
                <IconButton
                  aria-label="move item down"
                  disabled={index === values.length - 1}
                  edge="end"
                  onClick={moveDown}
                >
                  <ArrowCircleDownIcon />
                </IconButton>
                <IconButton
                  aria-label="remove item"
                  edge="end"
                  onClick={removeItem}
                >
                  <CancelIcon />
                </IconButton>
              </InputAdornment>
            }
            id={`${label.toLowerCase()}`}
            label={`${label} ${index + 1}`}
            onChange={(e) => updateValues(index, e)}
            size="small"
            type="text"
            value={value}
          />
        </FormControl>
      ))}
      <Button
        aria-label="add item"
        startIcon={<AddCircleIcon />}
        variant="outlined"
      >
        Add Item
      </Button>

      <PayloadRender payload={{ values }} />
    </Stack>
  );
};

export default ListEdit;
