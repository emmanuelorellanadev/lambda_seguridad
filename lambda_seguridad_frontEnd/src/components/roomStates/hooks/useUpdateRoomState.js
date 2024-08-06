import axios from 'axios';
import { toast } from 'react-hot-toast';

export const useUpdateRoomState = async(urlRoomState, roomStateName, roomStateState) => {
    await axios.put(urlRoomState, 
        {
            "roomState_name": roomStateName,
            "roomState": roomStateState
        },
        {headers: {"x-token": sessionStorage.getItem('token-xL')}})
    .then( resp => resp.data.resData) 
    .then(response => {
        toast.success(`${response}`, {
            duration: 3000,
            position: "top-right",
            style: {
                background: "rgb(33, 157, 192)",
                color: "#fff",
                height: "4rem"
            }
          });

    })    
    .catch( error => {
        console.log(error)
        toast.error(`${error.response.data.error} \n ${error.response.data.errorLambda}`, {
            duration: 3000,
            position: "top-right",
            style: {
                background: "rgb(33, 157, 192)",
                color: "#fff",
                height: "4rem"
            }
          });
    })
}
