
export const initialCreateRoom = {
    room: '',
    beds: '',
    maxPeople: '',
    phone: '',
    info: '',
    RoomStateId: 0,
    BranchId: 0,
    prices: [],
    services: []
}

export function roomReducer (state, action) {
    switch (action.type){
        case "UPDATE_ROOM": {
            return {
                ...state,
                room: action.room
            }
        }
        case "UPDATE_BEDS": {
            return {
                ...state,
                beds: action.beds
            }
        }
        case "UPDATE_MAXPEOPLE": {
            return {
                ...state,
                maxPeople: action.maxPeople
            }
        }
        case "UPDATE_PHONE": {
            return {
                ...state,
                phone: action.phone
            }
        }
        case "UPDATE_INFO": {
            return {
                ...state,
                info: action.info
            }
        }
        case "UPDATE_STATEID": {
            return {
                ...state,
                stateId: action.stateId
            }
        }
        case "UPDATE_BRANCHID": {
            return {
                ...state,
                branchId: action.branchId
            }
        }
        case "UPDATE_PRICES": {
            return {
                ...state,
                prices: action.prices
            }
        }
        case "UPDATE_SERVICES": {
            return {
                ...state,
                services: action.services
            }
        }
        case "RESET": {
            return ( {
                room: '',
                beds: '',
                maxPeople: '',
                phone: '',
                info: '',
                RoomStateId: 0,
                BranchId: 0,
                prices: [],
                services: []
            } )
        }
        default: return state
    }
}

