import axios from 'axios';
import { toast } from 'react-hot-toast'

export const useUpdateRoom = async(urlRoom, roomData) => {
       
    
    console.log(`Update ${urlRoom} \n ${roomData}`);
    // await axios.put(urlRoom, roomData,
    //     {
    //         headers: {'x-token': sessionStorage.getItem('token-xL')}
    //     }).then( (resp) => {
    //         toast.success(`${resp.data.resData}`,{
    //             duration: 3000,
    //             position: "top-right",
    //             style: {
    //                 background: "rgb(33, 157, 192)",
    //                 color: "#ffff",
    //                 height: "4rem"
    //             }
    //         })
    //     }).catch(error => {
    //         console.log(error)
    //         toast.error(`${error.response.data.error} \n ${error.response.data.errorLambda}`, {
    //             duration: 4000,
    //             position: "top-right",
    //             style: {
    //                 background: "rgb(33, 157, 192)",
    //                 color: "#ffff",
    //                 height: "4rem"
    //             }
    //         })
    //     })
}