export const initialCompanyState = {
  company: '',
  address: '',
  phone: '',
  description: '',
  mission: '',
  vision: '',
  logo: ''
};

export function companyReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_ALL":
      return { ...state, ...action.payload };
    case "RESET_COMPANY":
      return { ...initialCompanyState };
    default:
      return state;
  }
}