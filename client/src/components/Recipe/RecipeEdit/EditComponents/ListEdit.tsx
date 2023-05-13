import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PayloadRender from 'components/PayloadRender/PayloadRender';

interface IListEdit {
  label: string;
  list: (string | null)[] | null;
  onChange(): void;
}
const ListEdit = ({ label, list, onChange }: IListEdit) => {
  const [values, setValues] = useState<(string | null)[] | null>(list);

  const updateValues = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();

    if (values) {
      const valueString = e.target.value;
      const updatedValues = [...values];
      updatedValues[index] = valueString;
      setValues(updatedValues);

      onChange();
    }
  };

  return (
    <>
      <Typography variant="h2">{label}</Typography>
      {values &&
        values.map((value, index) => (
          <TextField
            className="field"
            id={`${label.toLowerCase()}`}
            label={`${label} ${index + 1}`}
            key={`${label}-${index}`}
            onChange={(e) => updateValues(index, e)}
            size="small"
            value={value}
            variant="outlined"
          />
        ))}
      <PayloadRender payload={{ values }} />
    </>
  );
};

export default ListEdit;
