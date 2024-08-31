import axios from "axios";

export const useGetUser = async(url, {setUsers, setUser, setPass, setRoleId, setState,  setBranchId, setNextPage, setPrevPage}) => {
    await axios.get(url, {
        headers: { "x-token": sessionStorage.getItem('token-xL') }
    })
    .then(resp => resp.data.resData)
    .then( async data => {
        if(setUsers){
            setUsers(data);
            setNextPage(data.nextPage);
            setPrevPage(data.prevPage);
        }else{
            setUser(data.user_name);
            setPass(data.user_pass);
            setRoleId(data.RoleId);
            setState(data.user_state);
            setBranchId(data.Branches[0].id)
        }
    })
    .catch( error => console.log(error))
}