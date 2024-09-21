import { initialFrameState } from "../NavBar"

export function frameReducer (state, action){
    switch (action.type) {
        case "PROFILE_FRAME":
            return { profileFrame: true}
        
        case "USER_FRAME":
            return { userFrame: true }
    
        case "COMPANY_FRAME":
            return { companyFrame: true}

        case "BRANCH_FRAME":
            return { branchFrame: true}

        case "BRANCHTYPE_FRAME":
            return { branchTypeFrame: true}
        
        case "PERSON_FRAME":
            return { personFrame: true }
    
        case "PERSONTYPE_FRAME":
            return { personTypeFrame: true}

        case "ROLE_FRAME":
            return { roleFrame: true}

        case "ROOM_FRAME":
            return { roomFrame: true }

        case "ROOMSTATE_FRAME":
            return { roomStateFrame: true }
    
        case "SERVICE_FRAME":
            return { serviceFrame: true}

        case "PRICE_FRAME":
            return { priceFrame: true}
    
        case "FRAMERESET":
            return { initialFrameState }

        default:
            return state;
    }
}