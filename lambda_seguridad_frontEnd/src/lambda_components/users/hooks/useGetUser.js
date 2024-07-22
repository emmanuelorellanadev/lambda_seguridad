import axios from'axios';
import Swal from 'sweetalert2';

export const useGetUser = async (urlUser, {setUsers, fillFields}) => {
    await axios.get(urlUser, {
        headers: { "x-token": sessionStorage.getItem('token-xL')},
        })
        .then( res => res.data.resData )
        .then( userData => {
            if (fillFields) fillFields(userData)
            if(setUsers) setUsers(userData)
        } )
        .catch(error => console.log(error))
}