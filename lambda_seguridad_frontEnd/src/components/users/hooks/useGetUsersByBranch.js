import axios from "axios";

export const useGetUserByBranch = async(urlUsersByBranch, {setUsers}) => {
    await axios.get(urlUsersByBranch, {
        headers: { "x-token": sessionStorage.getItem('token-xL') }
    })
    .then(resp => resp.data.resData)
    .then( data => setUsers(data))
    .catch( error => console.log(error))
}