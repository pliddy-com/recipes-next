import { ChangeEvent } from 'react';

jest.createMockFromModule('../TextEdit');

export const TextEdit = jest.fn(
  ({
    label,
    onChange,
    value
  }: {
    label: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    value: string | number;
  }) => {
    return (
      <div data-testid={`mock-text-field-${label}`}>
        <label>{label}</label>
        <input value={value} onChange={onChange} />
      </div>
    );
  }
);

export default TextEdit;
