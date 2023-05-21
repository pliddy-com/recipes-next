jest.createMockFromModule('../Authentication');

const authContextValues = {
  authLoading: false,
  isAuth: false,
  signIn: jest.fn(),
  signOut: jest.fn(),
  token: 'TOKEN'
};

const useAuthContext = jest.fn().mockImplementation(() => authContextValues);

export { useAuthContext };
