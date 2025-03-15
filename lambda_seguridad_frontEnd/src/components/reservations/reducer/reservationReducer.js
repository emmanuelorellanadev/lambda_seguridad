
export const initialCreateReservation = {
    query: '',
    PersonId: '',
    name: '',
    phone: '',
    cui: '',
    nit: '',
    BranchId: '',
    ReservationStateId: '',
    UserId: '',
    // reservationDetails: [{
        date_in: '',
        date_out: '',
        nights_number: '',
        people_number: '',
        RoomId: ''
    // }]
}

export function reservationReducer (state, action) {
    switch (action.type){
        case "UPDATE_QUERY": {
            return {
                ...state,
                query : action.query
            }
        }

        case "UPDATE_PERSON": {
            return {
                ...state,
                PersonId: action.PersonId
            }
        }

        case "UPDATE_NAME": {
            return {
                ...state,
                name: action.name
            }
        }

        case "UPDATE_PHONE": {
            return {
                ...state,
                phone: action.phone
            }
        }

        case "UPDATE_CUI": {
            return {
                ...state,
                cui: action.cui
            }
        }
        
        case "UPDATE_NIT": {
            return {
                ...state,
                nit: action.nit
            }
        }
        case "UPDATE_BRANCH": {
            return {
                ...state,
                BranchId: action.BranchId
            }
        }
        case "UPDATE_STATE": {
            return {
                ...state,
                ReservationStateId: action.ReservationStateId
            }
        }
        case "UPDATE_USER": {
            return {
                ...state,
                UserId: action.UserId
            }
        }
        case "UPDATE_DATEIN": {
            return {
                ...state,
                date_in: action.date_in
                // reservationDetails: {date_in: action.date_in}
            }
        }
        case "UPDATE_DATEOUT": {
            return {
                ...state,
                date_out: action.date_out
            }
        }
        case "UPDATE_NIGHTS": {
            return {
                ...state,
                nights_number: action.nights_number
            }
        }
        case "UPDATE_PEOPLE": {
            return {
                ...state,
                people_number: action.people_number
            }
        }
        case "UPDATE_ROOM": {
            return {
                ...state,
                RoomId: action.RoomId
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

