export const initialUserState = {
  user: '',
  pass: '',
  state: true,
  roles: [],
  roleId: '',
  companies: [],
  selectedCompany: '',
  branches: [],
  branchId: '',
  userImage: '',
  previewImage: '', 
};

export function userReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET_FORM":
      return { ...initialUserState };
    case "SET_ALL":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}