
export const initialCreateReservation = {
    PersonId: '',
    BranchId: '',
    ReservationStateId: '',
    UserId: '',
    reservationDetails: [{
        date_in: '',
        date_out: '',
        nights_number: '',
        people_number: '',
        RoomId: ''
    }]
}

export function reservationReducer (state, action) {
    switch (action.type){
        case "UPDATE_PERSON": {
            return {
                ...state,
                room: action.room
            }
        }
        case "UPDATE_BRANCH": {
            return {
                ...state,
                beds: action.beds
            }
        }
        case "UPDATE_STATE": {
            return {
                ...state,
                maxPeople: action.maxPeople
            }
        }
        case "UPDATE_USER": {
            return {
                ...state,
                phone: action.phone
            }
        }
        case "UPDATE_DATEIN": {
            return {
                ...state,
                info: action.info
            }
        }
        case "UPDATE_DATEOUT": {
            return {
                ...state,
                stateId: action.stateId
            }
        }
        case "UPDATE_NIGHTS": {
            return {
                ...state,
                branchId: action.branchId
            }
        }
        case "UPDATE_PEOPLE": {
            return {
                ...state,
                prices: action.prices
            }
        }
        case "UPDATE_ROOM": {
            return {
                ...state,
                services: action.services
            }
        }

        // case "UPDATE_ALL": {
        //     return {
        //         room: action.roomData.room_number,
        //         beds: action.roomData.room_beds,
        //         maxPeople: action.roomData.room_people,
        //         phone: action.roomData.room_phone,
        //         info: action.roomData.room_info,
        //         stateId: action.roomData.RoomStateId,
        //         branchId: action.roomData.BranchId,
        //         prices: action.roomData.RoomPrices,
        //         services: action.roomData.Services
        //     }
        // }

        case "RESET": {
            return ( {
                PersonId: '',
                BranchId: '',
                ReservationStateId: '',
                UserId: '',
                reservationDetails: [{
                    date_in: '',
                    date_out: '',
                    nights_number: '',
                    people_number: '',
                    RoomId: ''
                }]
            } )
        }
        default: return state
    }
}

