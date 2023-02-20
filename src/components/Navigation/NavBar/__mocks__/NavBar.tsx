jest.createMockFromModule('../NavBar');

// mock with no payload to use when testing layouts that don't need the menu structures built
export const NavBar = jest.fn(() => {
  return <div data-testid="NavBar">NavBar</div>;
});

export default NavBar;
