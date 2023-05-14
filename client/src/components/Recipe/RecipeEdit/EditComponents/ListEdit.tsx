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

interface IListEdit {
  id: string;
  label: string;
  list: (string | null)[];
  onChange({ id, values }: { id: string; values: (string | null)[] }): void;
}
const ListEdit = ({ id, label, list, onChange }: IListEdit) => {
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

    onChange({ id, values: updatedValues });
  };

  const moveItem = ({
    index,
    direction
  }: {
    index: number;
    direction: 'up' | 'down';
  }) => {
    if (index < values.length) {
      const array = [...values];
      const element = array.splice(index, 1)[0];
      array.splice(direction === 'up' ? index - 1 : index + 1, 0, element);
      setValues(array);
      onChange({ id, values: array });
    }
  };

  const removeItem = ({ index }: { index: number }) => {
    const array = [...values];
    array.splice(index, 1);
    setValues(array);
    onChange({ id, values: array });
  };

  const addItem = () => {
    const array = [...values];
    array.push('');
    setValues(array);
    onChange({ id, values: array });
  };

  return (
    <Stack direction="column" className="listEdit">
      <Typography variant="h2">{label}</Typography>
      {values.map((value, index) => (
        <FormControl variant="outlined" key={`${label}-${index}`}>
          <InputLabel
            htmlFor={`${label.toLowerCase()}-${index + 1}`}
          >{`${label} ${index + 1}`}</InputLabel>
          <OutlinedInput
            className="field"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="move item up"
                  disabled={index === 0 || !value}
                  edge="end"
                  onClick={() => moveItem({ index, direction: 'up' })}
                >
                  <ArrowCircleUpIcon />
                </IconButton>
                <IconButton
                  aria-label="move item down"
                  disabled={index === values.length - 1 || !value}
                  edge="end"
                  onClick={() => moveItem({ index, direction: 'down' })}
                >
                  <ArrowCircleDownIcon />
                </IconButton>
                <IconButton
                  aria-label="remove item"
                  edge="end"
                  onClick={() => removeItem({ index })}
                >
                  <CancelIcon />
                </IconButton>
              </InputAdornment>
            }
            id={`${label.toLowerCase()}-${index + 1}`}
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
        onClick={addItem}
        startIcon={<AddCircleIcon />}
        variant="outlined"
      >
        Add Item
      </Button>
    </Stack>
  );
};

export default ListEdit;
