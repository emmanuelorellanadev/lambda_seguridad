// import { initialSubMenuState } from "../NavBar"

export const initialGlobalReducer = {
    urlLambda : "http://localhost:8080",
    // branchId : 1,
}

export function globalReducer (state, action){
    switch (action.type) {
        case "UPDATEURL":
            return { urlLambda: state.urlLambda}
        
        // case "UPDATEBRANCHID":
        //     return { branchId: state.branchId }
    
        // case "SUBMENUSECURITY":
        //     return { menuSecurity: state.menuSecurity}

        // case "SUBMENUPERSON":
        //     return { menuPerson: state.menuPerson}
        
        // case "SUBMENUOPERATION":
        //     return { menuOperation: state.menuOperation}

        case "RESETGLOBAL":
            return { initialGlobalReducer }

        default:
            return state;
    }
}