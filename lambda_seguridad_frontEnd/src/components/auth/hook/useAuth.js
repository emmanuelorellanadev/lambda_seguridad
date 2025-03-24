import axios from'axios';
import { toast } from 'react-hot-toast'

import { parseJwt } from '../../helpers/parseJwt.js';

export const useAuth = async(urlAuth, user, pass, { setIsUser }) => {
    await axios.post(urlAuth, { 'name': user, 'pass': pass })
        .then( resp => resp.data)
        .then( (userData) => {
            const sessionData = parseJwt(userData.token);
            sessionStorage.setItem(`token-xL`, userData.token);
            sessionStorage.setItem(`user-xL`, sessionData.name);
            sessionStorage.setItem('role-xL', sessionData.role);
            sessionStorage.setItem('uid-xL', sessionData.uid)
            setIsUser(true);
            document.getElementById('login_container').style.display = 'none';

            toast.success(`Bienvenido ${sessionStorage.getItem("user-xL")}`, {
                duration: 3000,
                position: "top-right",
                style: {
                    background: "rgb(33, 157, 192)",
                    color: "#ffff",
                    height: "4rem"
                }
            })
        })
        .catch( error => {
            // console.log(error);
            toast.error(`${error.response.data.error}`, {
                duration: 3000,
                position: "top-right",
                style: {
                    background: "rgb(33, 157, 192)",
                    color: "#ffff",
                    height: "4rem"
                }
        })
    })


}