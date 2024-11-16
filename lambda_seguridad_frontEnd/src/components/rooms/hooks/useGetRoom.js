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

        //WORK HERE!!
        console.log(data);
        roomDispatch({ type: 'UPDATE_ROOM', room: data.room_number});
        roomDispatch({ type: 'UPDATE_BEDS', beds: data.room_beds});
        roomDispatch({ type: 'UPDATE_MAXPEOPLE', maxPeople: data.room_people});
        roomDispatch({ type: 'UPDATE_PHONE', phone: data.room_phone});
        roomDispatch({ type: 'UPDATE_INFO', info: data.room_info});
        roomDispatch({ type: 'UPDATE_STATEID', stateId: data.RoomStateId});
        roomDispatch({ type: 'UPDATE_BRANCHID', branchId: data.BranchId});
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