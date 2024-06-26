import axios from "axios";
import { toast } from 'react-hot-toast';

export const useUpdateBranch = async(url, branch, address, phone, state, branchTypeId, companyId) => {

    await axios.put(url, {
        "branch_name": branch,
        "branch_address": address,
        "branch_phone": phone,
        "branch_state": state,
        "CompanyId": companyId,
        "BranchTypeId": branchTypeId,
      },{ headers:{'x-token': sessionStorage.getItem('token-xL')} })
      .then( () => {
        toast.success("Sucursal guardada correctamente.", {
            duration: 4000,
            position: "top-right",
            style: {
                background: "rgb(33, 157, 192)",
                color: "#fff",
                height: "4rem"
            }
        })
      }).catch( error => {
        toast.error(`Error al actualizar la Sucursal \n ${error.response.data.errors}`, {
            duration: 4000,
            position: "top-right",
            style: {
                background: "rgb(33, 157, 192)",
                color: "#ffff",
                height: "4rem"
            }
        })
    })
}