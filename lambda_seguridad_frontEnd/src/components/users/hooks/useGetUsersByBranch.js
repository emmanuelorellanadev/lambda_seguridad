import axios from "axios";

export const useGetUserByBranch = async(url, {setUsers, setNextPage, setPrevPage}) => {
    await axios.get(url, {
        headers: { "x-token": sessionStorage.getItem('token-xL') }
    })
    .then(resp => resp.data.resData)
    .then( async data => {
        setUsers(data);
        setNextPage(data.nextPage);
        setPrevPage(data.prevPage);
    })
    .catch( error => console.log(error))
}