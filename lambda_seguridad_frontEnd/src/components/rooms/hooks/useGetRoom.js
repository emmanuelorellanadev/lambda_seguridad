import axios from "axios";
import toast from "react-hot-toast";
import { applyPaginationResponse } from "../../ui/pagination/utils/paginationUtils";
// import { applyPaginationResponse } from "../../../ui/pagination/utils/paginationUtils";

export const useGetRoom = async( urlRoom, { setRooms, roomDispatch, setOnLoad, dispatchPagination}) => {
  await axios(urlRoom, { headers: {"x-token": sessionStorage.getItem('token-xL')}})
    .then( resp => resp.data.resData )
    .then( data => {
      if(setRooms){
        if(setOnLoad) setOnLoad(true)
        setRooms( data )
      }else if(roomDispatch){
        roomDispatch({ type: "UPDATE_ALL", roomData: data})
      }else if(dispatchPagination){
        applyPaginationResponse(dispatchPagination, data);
        if (setOnLoad) setOnLoad(true)
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