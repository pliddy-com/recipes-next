import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';

import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import CancelIcon from '@mui/icons-material/Cancel';

import { toSlug } from 'lib/utils';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

interface IListEdit {
  id: string;
  heading?: 'h2' | 'h3';
  label: string;
  list: (string | null)[];
  onChange({ id, value }: { id: string; value: (string | null)[] }): void;
}
const ListEdit = ({ id, heading = 'h3', label, list, onChange }: IListEdit) => {
  const [values, setValues] = useState<(string | null)[]>(list);

  useEffect(() => {
    setValues(list);
  }, [list]);
  const updateValues = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();

    const valueString = e.target.value;
    const updatedValues = [...values];
    updatedValues[index] = valueString;
    setValues(updatedValues);

    onChange({ id, value: updatedValues });
  };

  const moveItem = ({
    index,
    direction
  }: {
    index: number;
    direction: 'up' | 'down';
  }) => {
    const array = [...values];
    const element = array.splice(index, 1)[0];
    array.splice(direction === 'up' ? index - 1 : index + 1, 0, element);
    setValues(array);
    onChange({ id, value: array });
  };

  const removeItem = ({ index }: { index: number }) => {
    const array = [...values];
    array.splice(index, 1);
    setValues(array);
    onChange({ id, value: array });
  };

  const addItem = () => {
    const array = [...values];
    array.push('');
    setValues(array);
    onChange({ id, value: array });
  };

  return (
    <Stack direction="column" className="listEdit">
      {heading === 'h2' && <Typography variant={heading}>{label}</Typography>}

      <Box className={`${heading !== 'h2' && ' section'}`}>
        {values.map((value, index) => (
          <TextField
            key={`${label}-${index}`}
            className="field"
            InputProps={{
              endAdornment: (
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
              )
            }}
            id={`${toSlug(label).toLowerCase()}-${index + 1}`}
            label={`${label} ${index + 1}`}
            onChange={(e) => updateValues(index, e)}
            size="small"
            type="text"
            value={value}
            variant="outlined"
          />
        ))}
        <Button
          aria-label="add item"
          onClick={addItem}
          size="large"
          startIcon={<AddCircleIcon />}
          variant="outlined"
        >
          Add Item
        </Button>
      </Box>
    </Stack>
  );
};

export default ListEdit;
