import axios from 'axios';
import { toast } from 'react-hot-toast'

export const useCreateReservation = async(urlReservation, createReservationData) => {

    
    const reservationData = {
        "reservation_date": createReservationData.reservation_date,
        "PersonId": createReservationData.PersonId,
        "BranchId": createReservationData.BranchId,
        "ReservationStateId": createReservationData.ReservationStateId,
        "UserId": createReservationData.UserId,
        "reservationDetails":[{
            "date_in": createReservationData.date_in,
            "date_out": createReservationData.date_out,
            "nights_number": createReservationData.nights_number,
            "people_number": createReservationData.people_number,
            "RoomId": createReservationData.RoomId,
        }
        ]
    }

    console.log(reservationData)

    await axios.post(urlReservation, reservationData,
        {
            headers: {'x-token': sessionStorage.getItem('token-xL')}
        }).then( (resp) => {
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
            toast.error(`${error.response.data.error}`, {
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