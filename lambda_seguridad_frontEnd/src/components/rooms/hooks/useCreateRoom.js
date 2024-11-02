import axios from 'axios';
import { toast } from 'react-hot-toast'

export const createRoom = async(logo) => {
        
    const url = 'http://localhost:8080/room';

    const roomData = new FormData(document.querySelector('#CreateCompany_form'));
    // roomData.append('img', logo);

    await axios.post(url, roomData,
        {
            headers: {'x-token': sessionStorage.getItem('token-xL')}
        }).then( (resp) => {
            toast.success(`${resp.data.resData}`,{
                duration: 3000,
                position: "top-right",
                style: {
                    background: "rgb(33, 157, 192)",
                    color: "#ffff",
                    height: "4rem"
                }
            })
        }).catch(error => {
            console.log(error)
            toast.error(`${error.response.data.error} \n ${error.response.data.errorLambda}`, {
                duration: 4000,
                position: "top-right",
                style: {
                    background: "rgb(33, 157, 192)",
                    color: "#ffff",
                    height: "4rem"
                }
            })
        })
}