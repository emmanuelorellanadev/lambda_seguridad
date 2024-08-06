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
    .then( resp => {
        //WORK HERE!!!
        //show the message sended by backEnd and the error
        toast.success(`${resp.data.resData}`, {
            duration: 3000,
            position: "top-right",
            style: {
                background: "rgb(33, 157, 192)",
                color: "#ffff",
                height: "4rem"
            }
        })
    })
    .catch( error => {
        console.log(error)
        toast.error(`${error.response.data.error} \n ${error.response.data.errorLambda}`, {
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