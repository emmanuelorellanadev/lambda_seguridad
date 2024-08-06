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
      .then( (resp) => {
        toast.success(`${resp.data.resData}`, {
            duration: 3000,
            position: "top-right",
            style: {
                background: "rgb(33, 157, 192)",
                color: "#fff",
                height: "4rem"
            }
        })
      }).catch( error => {
        toast.error(`${error.response.data.error} \n ${error.response.data.errorLambda}`, {
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