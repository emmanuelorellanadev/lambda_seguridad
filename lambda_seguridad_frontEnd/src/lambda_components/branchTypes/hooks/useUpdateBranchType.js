import axios from "axios";
import toast from "react-hot-toast";

export const useUpdateBranchType = async(urlBranchType, id, branchTypeName, branchTypeState) => {
    await axios.put(urlBranchType, {
        "id": id,
        "branchType_name": branchTypeName,
        "branchType_state": branchTypeState
    },  {
        headers: {"x-token": sessionStorage.getItem('token-xL')
    }})
        .then( () => {
            toast.success("Tipo de Sucursal actualizado exitosamente", {
                duration: 4000,
                position: "top-right",
                style: {
                    background: "rgb(33, 157, 192)",
                    color: "#fff",
                    height: "4rem"
                }
              });
        })
        .catch( error => {
            console.log(error)
            toast.error("Error al actualizar el Tipo de Sucursal", {
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