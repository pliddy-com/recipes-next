jest.createMockFromModule('../SearchResults');

export const SearchResults = jest.fn(() => (
  <div data-testid="search-results">SearchResults</div>
));

export default SearchResults;
