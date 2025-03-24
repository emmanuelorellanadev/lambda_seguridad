import axios from "axios";
import toast from "react-hot-toast";

export const useGetRoom = async( urlRoom, { setRooms, roomDispatch, setOnLoad, dispatchPagination}) => {
  await axios(urlRoom, { headers: {"x-token": sessionStorage.getItem('token-xL')}})
    .then( resp => resp.data.resData )
    .then( data => {
      if(setRooms){
        if(setOnLoad) setOnLoad(true)
        setRooms( data )
        // setNextPage(data.nextPage) 
        // setPrevPage(data.prevPage)
      }else if(roomDispatch){
        roomDispatch({ type: "UPDATE_ALL", roomData: data})
      }else if(dispatchPagination){
        dispatchPagination({type: 'UPDATE_DATA', data: data.data})
        dispatchPagination({type: 'UPDATE_NEXT', nextPage: data.nextPage})
        dispatchPagination({type: 'UPDATE_PREV', prevPage: data.prevPage})
        dispatchPagination({type: 'UPDATE_PAGE', page: data.currentPage})
        dispatchPagination({type: 'UPDATE_TOTAL', total: data.total})
        setOnLoad(true)
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