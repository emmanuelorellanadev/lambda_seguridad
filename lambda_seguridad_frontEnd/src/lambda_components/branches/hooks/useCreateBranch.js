import axios from 'axios'
import { toast } from'react-hot-toast'

export const useCreateBranch = async( branch, address, phone, state, branchTypeSelected, companySelected ) => {
    const url = 'http://localhost:8080/branch'

    await axios.post(url, {
      "branch_name": branch,
      "branch_address": address,
      "branch_phone": phone,
      "branch_state": state,
      "BranchTypeId": branchTypeSelected,
      "CompanyId": companySelected
    },
    {
      headers: { "x-token": sessionStorage.getItem("token-xL") }
    })
    .then( response => {
        if (response.data.resData) {
            toast.success("Sucursal creada exitosamente", {
                duration: 3000,
                position: "top-right",
                style: {
                    background: "rgb(33, 157, 192)",
                    color: "#ffff",
                    height: "4rem"
                }
            })
        }
    })
    .catch( error => {
        toast.error('Error al guardar la Sucursal', {
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