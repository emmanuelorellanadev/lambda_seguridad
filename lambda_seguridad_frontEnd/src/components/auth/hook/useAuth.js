import { parseJwt } from '../../helpers/parseJwt.js';
import axios from'axios';

import { toast } from 'react-hot-toast'

export const useAuth = async(urlAuth, user, pass, { setIsUser, setToken, setLoggedUser, setLoggedRole, setUId }) => {
        // const { setToken } = useContext(GlobalContext);
        // WORK HERE!!!!!
        //IS NOT POSSIBLE TO USE useContext INSIDE A FUNCTION, ONLY INSIDE A REACT COMPONENT OR A CUSTOM HOOK
        //YOU NEED TO PASS setToken AS PARAMETER FROM THE COMPONENT WHERE YOU CALL useAuth

    await axios.post(urlAuth, { 'name': user, 'pass': pass })
        .then( resp => resp.data)
        .then( (userData) => {
            const sessionData = parseJwt(userData.token);
            // sessionStorage.setItem(`token-xL`, userData.token);
            // Guardar token en GlobalContext
            setToken?.(userData.token);
            setLoggedUser?.(sessionData.name);
            setLoggedRole?.(sessionData.role);
            setUId?.(sessionData.uid);
            // sessionStorage.setItem(`token-xL`, userData.token);
            // sessionStorage.setItem(`user-xL`, sessionData.name);
            // sessionStorage.setItem('role-xL', sessionData.role);
            // sessionStorage.setItem('uid-xL', sessionData.uid);
            sessionStorage.setItem('branchId-xL', sessionData.branchId);
            sessionStorage.setItem('branch-xL', sessionData.branch);
            setIsUser(true);
            document.getElementById('login_container').style.display = 'none';

            toast.success(`Bienvenido ${sessionData.name}`, {
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
            console.log(error);
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