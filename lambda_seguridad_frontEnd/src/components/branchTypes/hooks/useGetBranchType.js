import axios from "axios";
import toast from "react-hot-toast";

export const useGetBranchType = async (urlBranchType, {setBranchTypes, setId, setBranchTypeName, setBranchTypeState, setNextPage, setPrevPage,}) => {
    await axios.get(urlBranchType, { headers: {'x-token': sessionStorage.getItem('token-xL')}})
    .then( (resp) => resp.data.resData)
    .then( data => {
        if(setBranchTypeName){
            setId(data.id)
            setBranchTypeName(data.branchType_name)
            setBranchTypeState(data.branchType_state)
        }else if(setBranchTypes){
            setBranchTypes(data);
            setNextPage ? setNextPage(data.nextPage): '';
            setPrevPage ? setPrevPage(data.prevPage) : '';
        }
    })
    .catch( error => {
        console.log(error)
        toast.error("Error al recuperar los tipos de sucursal.", {
            duration: 4000,
            position: "top-right",
            style: {
                background: "rgb(33, 157, 192)",
                color: "#fff",
                height: "4rem"
            }
        })
    })
}