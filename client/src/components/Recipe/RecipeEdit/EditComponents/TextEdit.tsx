import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { ChangeEvent, ReactElement } from 'react';

interface ITextEdit {
  className?: string;
  disabled?: boolean;
  endAdornment?: ReactElement | string;
  id: string;
  label: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  value: string | number;
}
const TextEdit = ({
  className,
  disabled = false,
  endAdornment,
  id,
  label,
  onChange,
  value
}: ITextEdit) => {
  return (
    <TextField
      className={`field${className ? ` ${className}` : ''}`}
      disabled={disabled}
      InputProps={{
        ...(endAdornment
          ? {
              endAdornment: (
                <InputAdornment position="end">{endAdornment}</InputAdornment>
              )
            }
          : {})
      }}
      id={id}
      label={label}
      name={id}
      onChange={onChange ? (e) => onChange(e) : undefined}
      size="small"
      value={value}
      variant="outlined"
    />
  );
};

export default TextEdit;
