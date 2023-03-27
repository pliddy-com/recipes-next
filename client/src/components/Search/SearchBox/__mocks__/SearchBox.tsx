jest.createMockFromModule('../SearchBox');

export const SearchBox = jest.fn(() => (
  <div data-testid="search-box">SearchBox</div>
));

export default SearchBox;
