import axios from 'axios';
import { toast } from 'react-hot-toast';

export const useCreateRoomState = async(urlRoomState, roomStateName, roomStateState, { setOnLoad }) => {
    await axios.post(urlRoomState, {
        "roomState_name": roomStateName,
        "roomState": roomStateState
    }, {headers: {"x-token": sessionStorage.getItem("token-xL")}})
        .then( (response) => {
            toast.success(`${response.data.resData}`, {
                duration: 3000,
                position: "top-right",
                style: {
                    background: "rgb(33, 157, 192)",
                    color: "#fff",
                    height: "4rem"
                }
              });
            setOnLoad(false)
        })
        .catch( error => {
            toast.error(`${error.response.data.error} \n ${error.response.data.errorLambda}`, {
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