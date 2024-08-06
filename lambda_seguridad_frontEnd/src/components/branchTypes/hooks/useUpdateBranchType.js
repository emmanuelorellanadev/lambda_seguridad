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
        .then( (resp) => {
            toast.success(`${resp.data.resData}`, {
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
            toast.error(`${error.response.data.error} \n ${error.response.data.errorLambda}`, {
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