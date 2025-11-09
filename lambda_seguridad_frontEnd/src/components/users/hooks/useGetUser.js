import axios from "axios";

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
            paginationDispatch({type: "UPDATE_PREV", prevPage: data.prevPage}),
            paginationDispatch({type: "UPDATE_NEXT", nextPage: data.nextPage}),
            paginationDispatch({type: "UPDATE_PAGE", page: data.currentPage}),
            paginationDispatch({type: "UPDATE_ROWSBYPAGE", rowsByPage: data.limit}),
            paginationDispatch({type: "UPDATE_TOTAL", total: data.total}),
            paginationDispatch({type: "UPDATE_SEARCH", search: data.search}),
            paginationDispatch({type: "UPDATE_DATA", data: data.data})
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