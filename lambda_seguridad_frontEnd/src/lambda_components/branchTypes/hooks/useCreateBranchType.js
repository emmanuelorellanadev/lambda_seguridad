import axios from "axios";
import { toast } from "react-hot-toast";


export const useCreateBranchType = async(urlBranchType, branchType, branchTypeState, setOnLoad) => {

    await axios.post(urlBranchType, {
        // "id": id,
        "branchType_name": branchType,
        "branchType_state": branchTypeState
      }, 
      { headers: { "x-token": sessionStorage.getItem("token-xL") } })
        .then( (resp) => {
          setOnLoad(false)
          toast.success(`${resp.data.resData}`, {
            duration: 3000,
            position: "top-right",
            style: {
                background: "rgb(33, 157, 192)",
                color: "#fff",
                height: "4rem"
            }
          });
        } )
        .catch( error => {
          toast.error(`${error.response.data.errors} \n ${error.response.data.errorLambda}`, {
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