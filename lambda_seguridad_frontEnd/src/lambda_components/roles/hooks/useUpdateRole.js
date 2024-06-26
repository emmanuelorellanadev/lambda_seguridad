import axios from "axios";
import toast from "react-hot-toast";

export const useUpdateRole = async(urlRole, id, roleName, roleState) => {

    await axios.put(urlRole, {
        "id": id,
        "role_name": roleName,
        "role_state": roleState
    },  {
        headers: {"x-token": sessionStorage.getItem('token-xL')
    }})
        .then( () => {
            toast.success("Rol actualizado correctamente.", {
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
            toast.error("Error al actualizar el Rol", {
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