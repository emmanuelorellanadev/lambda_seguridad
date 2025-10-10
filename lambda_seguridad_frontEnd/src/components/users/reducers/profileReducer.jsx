// Estado inicial para el perfil
export const initialProfileState = {
    userName: "",
    userCreation: "",
    userImg: "",
    role: "",
    branch: [],
    companies: [],
    currentPass: "",
    pass: "",
    passConfirm: ""
};

// Reducer para el perfil
export function profileReducer(state, action) {
    switch (action.type) {
        case "SET_FIELD":
            return { ...state, [action.field]: action.value };
        case "SET_ALL":
            return { ...state, ...action.payload };
        case "RESET_PASS":
            return { ...state, currentPass: "", pass: "", passConfirm: "" };
        default:
            return state;
    }
}
