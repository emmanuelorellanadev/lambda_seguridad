import axios from "axios";
import toast from "react-hot-toast";

export const useGetReservation = async( urlReservation, reservationDispatch) => {
  await axios(urlReservation, { headers: {"x-token": sessionStorage.getItem('token-xL')}})
    .then( resp => resp.data.resData )
    .then( data => {
      if(data.data){
        reservationDispatch({type: "UPDATE_PREV", prevPage: data.prevPage}),
        reservationDispatch({type: "UPDATE_NEXT", nextPage: data.nextPage}),
        reservationDispatch({type: "UPDATE_PAGE", page: data.currentPage}),
        reservationDispatch({type: "UPDATE_ROWSBYPAGE", rowsByPage: data.limit}),
        reservationDispatch({type: "UPDATE_TOTAL", total: data.total}),
        reservationDispatch({type: "UPDATE_SEARCH", search: data.search}),
        reservationDispatch({type: "UPDATE_DATA", data: data.data})
      }else{
        reservationDispatch({type: 'UPDATE_PERSON', PersonId: data.Person.id})
        reservationDispatch({type: 'UPDATE_NAME', name: `${data.Person.person_names} ${data.Person.person_surnames}`})
        reservationDispatch({type: 'UPDATE_PHONE', phone: data.Person.person_phone})
        reservationDispatch({type: 'UPDATE_CUI', cui: data.Person.person_cui})
        reservationDispatch({type: 'UPDATE_NIT', nit: data.Person.person_nit})
        reservationDispatch({type: 'UPDATE_BRANCH', BranchId: data.Person.BranchId})
        for (const detail in data.ReservationDetails) {
          reservationDispatch({type: 'UPDATE_NIGHTS', nights_number: data.ReservationDetails[detail].nights_number})
          reservationDispatch({type: 'UPDATE_PEOPLE', people_number: data.ReservationDetails[detail].people_number})
          reservationDispatch({type: 'UPDATE_DATEIN', date_in: data.ReservationDetails[detail].date_in.split(' ')[0]})
          reservationDispatch({type: 'UPDATE_DATEOUT', date_out: data.ReservationDetails[detail].date_out.split(' ')[0]})
          reservationDispatch({type: 'UPDATE_ROOMID', RoomId: data.ReservationDetails[detail].RoomId})
          reservationDispatch({type: 'UPDATE_ROOMNUMBER', room_number: data.ReservationDetails[detail].Room.room_number})
          // console.log(data.ReservationDetails)
          // console.log(data.ReservationDetails[detail].nights_number)
        }
      }

    })
    .catch( error => {
      console.log(error)
      // toast.error(`${error.response.data.error}`, {
      //     duration: 4000,
      //     position: "top-right",
      //     style: {
      //         background: "rgb(33, 157, 192)",
      //         color: "#fff",
      //         height: "4rem"
      //     }
      //   });
  })

}