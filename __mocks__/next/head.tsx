// Mock modules for npm packages are in the __mocks__ directory
// at the root level as a sibling of node_modules

// create mock version of npm package
jest.genMockFromModule('next/head');

// export mocked version of component

// NOTE: a mocked version of the NextJS component is used to render output
// to the test environment (vs. adding head tags to a non-existent page document)

export const Head = jest.fn(
  ({ children }: { children: Array<React.ReactElement> }) => {
    return <>{children}</>;
  }
);

export default Head;
