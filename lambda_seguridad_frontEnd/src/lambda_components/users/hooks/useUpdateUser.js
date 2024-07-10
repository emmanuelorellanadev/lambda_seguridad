import axios from'axios';
import { toast } from 'react-hot-toast';
export const useUpdateUser = async (urlUser, state, props) => {
    const userData = new FormData(document.querySelector('#UpdateUser_form'));

    userData.set('user_state', state)
    // userData.append('img', userImage)

    await axios.put(urlUser, 
        userData,
    {
        headers: { "x-token": sessionStorage.getItem('token-xL') 
    }})
        .then( (resp) => {
            toast.success(`${resp.data.resData}`,{
                duration: 3000,
                position: "top-right",
                style: {
                    background: "rgb(33, 157, 192)",
                    color: "#ffff",
                    height: "4rem"
                }
            })
            props.navListUsers();
        })
        .catch( (error) => {
            toast.error(`${error.response.data.errors} \n ${error.response.data.errorLambda}`,{
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