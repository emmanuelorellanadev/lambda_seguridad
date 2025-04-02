
export const initialSubMenuState = {
    menuAdmin:      false, 
    menuUser:       false, 
    menuSecurity:   false, 
    menuPerson:     false,
    menuOperation:  false
};

export function subMenuReducer (state, action){
    switch (action.type) {
        case "SUBMENUADMIN":
            return { menuAdmin: !state.menuAdmin}
        
        case "SUBMENUUSER":
            return { menuUser: !state.menuUser }
    
        case "SUBMENUSECURITY":
            return { menuSecurity: !state.menuSecurity}

        case "SUBMENUPERSON":
            return { menuPerson: !state.menuPerson}
        
        case "SUBMENUOPERATION":
            return { menuOperation: !state.menuOperation}

        case "SUBMENURESET":
            return { initialSubMenuState }

        default:
            return state;
    }
}