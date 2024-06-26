import axios from "axios";
import { toast } from "react-hot-toast";


export const useCreateBranchType = async(urlBranchType, branchType, branchTypeState, setOnLoad) => {

    await axios.post(urlBranchType, {
        // "id": id,
        "branchType_name": branchType,
        "branchType_state": branchTypeState
      }, 
      { headers: { "x-token": sessionStorage.getItem("token-xL") } })
        .then( () => {
          setOnLoad(false)
          toast.success("Tipo de Sucursal creado exitosamente", {
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
          toast.error("Error al guardar el tipo de sucursal.", {
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