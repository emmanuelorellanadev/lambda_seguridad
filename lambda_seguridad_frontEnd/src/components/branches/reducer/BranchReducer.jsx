export const initialBranchState = {
  branch: '',
  address: '',
  phone: '',
  state: true,
  branchTypeId: '',
};

export function branchReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_ALL":
      return { ...state, ...action.payload };
    case "RESET_BRANCH":
      return { ...initialBranchState };
    default:
      return state;
  }
}