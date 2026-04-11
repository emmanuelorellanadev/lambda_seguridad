export const initialBranchTypeState = {
  id: '',
  branchTypeName: '',
  branchTypeState: true,
};

export function branchTypeReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_ALL":
      return { ...state, ...action.payload };
    case "RESET_BRANCH_TYPE":
      return { ...initialBranchTypeState };
    default:
      return state;
  }
}