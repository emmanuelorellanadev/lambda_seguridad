import axios from "axios";
import { applyPaginationResponse } from "../../ui/pagination/utils/paginationUtils";

// export const useGetUser = async(url, {setUsers, setUser, setPass, setRoleId, setState,  setBranchId, setNextPage, setPrevPage}) => {
export const useGetUser = async(url, paginationDispatch, userDispatch, token) => {
    await axios.get(url, {
        // headers: { "x-token": sessionStorage.getItem('token-xL') }
        headers: { "x-token": token }
    })
    .then(resp => resp.data.resData)
    .then( async data => {
        // if(setUsers){
        //     setUsers?.(data);
        //     setNextPage?.(data.nextPage);
        //     setPrevPage?.(data.prevPage);
        // }else{
        //     setUser?.(data.user_name);
        //     setPass?.(data.user_pass);
        //     setRoleId?.(data.RoleId);
        //     setState?.(data.user_state);
        //     setBranchId?.(data?.Branches?.[0]?.id);
        // }

        if(data.data){
            applyPaginationResponse(paginationDispatch, data);
        }else{
            if (userDispatch && data) {
                userDispatch({
                    type: "SET_ALL",
                    payload: {
                        user: data.user_name ?? '',
                        pass: data.user_pass ?? '',
                        roleId: data.RoleId ?? '',
                        state: typeof data.user_state === 'boolean' ? data.user_state : !!data.user_state,
                        branchId: data?.Branches?.[0]?.id ?? '',
                        selectedCompany: data?.Branches?.[0]?.CompanyId ?? '',
                    }
                })
            }
        }
    })
    .catch( error => console.log(error))
}