import axios from 'axios';
import { toast } from 'react-hot-toast';

export const useGetRoomStates = async (urlRoomState, {setRoomStatesRes, setNextPage, setPrevPage, setRoomStateName, setRoomStateState}) => {
    await axios.get(urlRoomState, {headers: {"x-token": sessionStorage.getItem('token-xL')}})
        .then( resp => resp.data.resData) 
        .then(data => {
            if(setRoomStateName){
                setRoomStateName(data.roomState_name);
                setRoomStateState(data.roomState);
            }else{
                setRoomStatesRes(data);
                setNextPage(data?.nextPage);
                setPrevPage(data?.prevPage);
            }
        })    
        .catch( error => {
            console.log(error)
            toast.error(`${error.response.data.error} \n ${error.response.data.errorLambda}`);
        })
}