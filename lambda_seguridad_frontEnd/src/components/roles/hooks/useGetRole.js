import axios from "axios";
import toast from "react-hot-toast";

export const useGetRole = async (urlRole, { setRoles, setId, setRoleName, setRoleState, setNextPage, setPrevPage} ) => {
    await axios.get(urlRole, { headers: {'x-token': sessionStorage.getItem('token-xL')}})
    .then( (resp) => resp.data.resData)
    .then( data => {
        if(setRoles){
            setRoles(data);
            setNextPage(data.nextPage);
            setPrevPage(data.prevPage)
        }else if(setId){
            setId(data.id);
            setRoleName(data.role_name);
            setRoleState(data.role_state);
        }
    }) 
    .catch( error => {
        console.log(error)
        toast.error("Error al recuperar los roles", {
            duration: 4000,
            position: "top-right",
            style: {
                background: "rgb(33, 157, 192)",
                color: "#fff",
                height: "4rem"
            }
          });
    })
}