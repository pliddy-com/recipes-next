jest.createMockFromModule('../Content');

const cmContextValues = {
  canSave: false,
  editMode: false,
  editLoading: false,
  setCanSave: jest.fn(),
  setEditMode: jest.fn(),
  saveRecipe: jest.fn(),
  setRecipe: jest.fn(),
  setSupressEdit: jest.fn(),
  supressEdit: false,
  toggleEdit: jest.fn()
};

const useContentManagementContext = jest
  .fn()
  .mockImplementation(() => cmContextValues);

export { useContentManagementContext };
