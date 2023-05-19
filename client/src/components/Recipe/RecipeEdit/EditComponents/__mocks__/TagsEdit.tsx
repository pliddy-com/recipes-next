// import { ChangeEventHandler } from 'react';
import { TagDefaultFragment } from 'types/queries';

jest.createMockFromModule('../TagsEdit');

export const ListEdit = jest.fn(
  ({
    onChange,
    tags
  }: {
    tags: (TagDefaultFragment | null | undefined)[];
    onChange: ({
      value
    }: {
      value: (TagDefaultFragment | null | undefined)[];
    }) => void;
  }) => {
    return (
      <div data-testid="mock-tags-edit">
        <label htmlFor="tags-select">Tags</label>
        <select
          aria-label="tags-select"
          data-testid="tags-select"
          name="tags-select"
          id="tags-select"
          onChange={() =>
            onChange({
              value: [
                {
                  __typename: 'Tag',
                  sys: {
                    id: 'tag-id',
                    __typename: 'Sys'
                  },
                  title: 'Tag',
                  slug: 'tag'
                }
              ]
            })
          }
        >
          {tags.map((tag) => (
            <option value={tag?.sys?.id} key={tag?.sys?.id}>
              {tag?.title}
            </option>
          ))}
          <option data-testid="test-value" value="test-value">
            Test Value
          </option>
        </select>
      </div>
    );
  }
);

export default ListEdit;
