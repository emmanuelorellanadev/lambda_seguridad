import axios from "axios";
import { toast } from 'react-hot-toast';

export const useUpdateBranch = async(url, token, branchState, companyId) => {

    await axios.put(url, {
        "branch_name": branchState.branch,
        "branch_address": branchState.address,
        "branch_phone": branchState.phone,
        "branch_state": branchState.state,
        "CompanyId": companyId,
        "BranchTypeId": branchState.branch,
    },{ headers:{'x-token': token} })
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