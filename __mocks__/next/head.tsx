jest.createMockFromModule('next/head');

// S mocked version of the NextJS component is used to render output
// to the test environment (vs. adding head tags to a non-existent page document)

export const Head = jest.fn(
  ({ children }: { children: Array<React.ReactElement> }) => {
    return <>{children}</>;
  }
);

export default Head;
