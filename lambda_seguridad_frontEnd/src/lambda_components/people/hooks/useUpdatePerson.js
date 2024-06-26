import axios from "axios";
import toast from "react-hot-toast";

export const useUpdatePerson = async(urlPerson, names, surNames, cui, nit, phone, address, personTypeId, branchId) => {
    await axios.put(urlPerson, 
      {
        "person_name": names,
        "person_surnames": surNames,
        "person_cui": cui,
        "person_nit": nit,
        "person_phone": phone,
        "person_address": address,
        "PersonTypeId": personTypeId,
        "BranchId": branchId
      }, {headers: {"x-token": sessionStorage.getItem("token-xL")}} )
        .then( () =>{
            toast.success('Persona actualizada exitosamente.',{
                duration: 3000,
                position: "top-right",
                style: {
                    background: "rgb(33, 157, 192)",
                    color: "#ffff",
                    height: "4rem"
                }
            })
        })
        .catch(error => {
            console.log(error)
            toast.error('Error al actualizar persona.',{
                duration: 3000,
                position: "top-right",
                style: {
                    background: "rgb(33, 157, 192)",
                    color: "#ffff",
                    height: "4rem"
                }
            })
        })
}