import axios from "axios";
import toast from "react-hot-toast";

export const useCreateRole = async(urlRole, id, roleName, roleState, { setOnLoad }) => {

    await axios.post(urlRole, {
        "id": id,
        "role_name": roleName,
        "role_state": roleState
      }, 
      { headers: { "x-token": sessionStorage.getItem("token-xL") } })
        .then( () => {
            setOnLoad(false);
            toast.success("Rol creado exitosamente..", {
                duration: 4000,
                position: "top-right",
                style: {
                    background: "rgb(33, 157, 192)",
                    color: "#fff",
                    height: "4rem"
                }
              });
        } )
        .catch( error => {
            console.log(error)
            toast.error("Error al crear el Rol.", {
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