import axios from "axios";

export const useGetUserByBranch = async(urlUsersByBranch, {setUsers, setNextPage, setPrevPage}) => {
    await axios.get(urlUsersByBranch, {
        headers: { "x-token": sessionStorage.getItem('token-xL') }
    })
    .then(resp => resp.data.resData)
    .then( data => {
        setUsers(data);
        setNextPage(data.nextPage);
        setPrevPage(data.prevPage);
    })
    .catch( error => console.log(error))
}