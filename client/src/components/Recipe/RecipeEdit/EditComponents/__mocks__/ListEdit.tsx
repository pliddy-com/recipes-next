import { ChangeEvent } from 'react';

jest.createMockFromModule('../ListEdit');

export const ListEdit = jest.fn(
  ({
    id,
    label,
    onChange,
    list
  }: {
    id: string;
    label: string;
    list: (string | null)[];
    onChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  }) => {
    return (
      <div data-testid={`mock-list-field-${id}`}>
        <p>{label}</p>
        {list.map((item, index) => (
          <div key={index}>
            <label>{`label-${index}`}</label>
            <input value={item || ''} onChange={onChange} />
          </div>
        ))}
      </div>
    );
  }
);

export default ListEdit;
