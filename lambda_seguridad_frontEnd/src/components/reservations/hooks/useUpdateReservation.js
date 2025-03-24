import axios from 'axios';
import { toast } from 'react-hot-toast'

export const useUpdateReservation = async(urlReservation, reservationReducerData) => {

    
    const reservationData = {
        "PersonId": reservationReducerData.PersonId,
        "BranchId": reservationReducerData.BranchId,
        "ReservationStateId": reservationReducerData.ReservationStateId,
        "UserId": reservationReducerData.UserId,
        "reservationDetails":[{
            "date_in": reservationReducerData.date_in,
            "date_out": reservationReducerData.date_out,
            "nights_number": reservationReducerData.nights_number,
            "people_number": reservationReducerData.people_number,
            "RoomId": reservationReducerData.RoomId,
            }
        ]
    }

    await axios.put(urlReservation, reservationData, 
        { 
            headers: {'x-token': sessionStorage.getItem( 'token-xL' ) } 
        } )
        .then( (resp) => {
            toast.success(`${resp.data.resData}`,{
                duration: 3000,
                position: "top-right",
                style: {
                    background: "rgb(33, 157, 192)",
                    color: "#ffff",
                    height: "4rem"
                }
            })
        }).catch(error => {
            console.log(error)
            toast.error(`${error.response.data.error} \n ${error.response.data.errorLambda}`, {
                duration: 4000,
                position: "top-right",
                style: {
                    background: "rgb(33, 157, 192)",
                    color: "#ffff",
                    height: "4rem"
                }
            })
        })
}