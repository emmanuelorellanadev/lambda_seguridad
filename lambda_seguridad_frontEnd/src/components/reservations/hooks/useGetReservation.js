import axios from "axios";
import toast from "react-hot-toast";

export const useGetReservation = async( urlReservation, { setReservations, setNextPage, setPrevPage}) => {
  await axios(urlReservation, { headers: {"x-token": sessionStorage.getItem('token-xL')}})
    .then( resp => resp.data.resData )
    .then( data => {
      if(setReservations){
        setReservations( data )
        setNextPage(data.nextPage) 
        setPrevPage(data.prevPage)
      }
    })
    .catch( error => {
      console.log(error)
      toast.error(`${error.response.data.error}`, {
          duration: 4000,
          position: "top-right",
          style: {
              background: "rgb(33, 157, 192)",
              color: "#fff",
              height: "4rem"
          }
        });
  })

}