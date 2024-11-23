import axios from "axios";
import toast from "react-hot-toast";

export const useGetRoom = async( urlRoom, { setRooms, roomDispatch, setOnLoad, setNextPage, setPrevPage}) => {
  await axios(urlRoom, { headers: {"x-token": sessionStorage.getItem('token-xL')}})
    .then( resp => resp.data.resData )
    .then( data => {
      if(setRooms){
        if(setOnLoad) setOnLoad(false)
        setRooms( data )
        setNextPage(data.nextPage) 
        setPrevPage(data.prevPage)
      }else if(roomDispatch){
        roomDispatch({ type: "UPDATE_ALL", roomData: data})
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