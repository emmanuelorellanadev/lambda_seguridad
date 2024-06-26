import axios from "axios";
import toast from "react-hot-toast";

export const userGetUser = async(urlUsersByBranch, {setUsers}) => {
    await axios.get(urlUsersByBranch, {
        headers: { "x-token": sessionStorage.getItem('token-xL') }
    })
    .then(resp => resp.data.resData)
    .then( data => setUsers(data))
    .catch( error => console.log(error))
}