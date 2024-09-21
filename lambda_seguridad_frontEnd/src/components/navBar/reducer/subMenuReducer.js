import { initialSubMenuState } from "../NavBar"

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

        case "SUBMENURESET":
            return { initialSubMenuState }

        default:
            return state;
    }
}