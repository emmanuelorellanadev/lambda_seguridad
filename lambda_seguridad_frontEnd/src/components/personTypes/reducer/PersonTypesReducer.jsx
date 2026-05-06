export const initialPersonTypeState = {
  id: '',
  personTypeName: '',
  personTypeState: true,
};

export function personTypeReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_ALL':
      return { ...state, ...action.payload };
    case 'RESET_PERSON_TYPE':
      return { ...initialPersonTypeState };
    default:
      return state;
  }
}