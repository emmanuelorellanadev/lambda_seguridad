import axios from 'axios'
import toast from 'react-hot-toast'

export const useUpdatePeopleType = async(url, id, personTypeName, personTypeState) => {

    await axios.put(url, {
        "id": id,
        "personType_name": personTypeName,
        "personType_state": personTypeState
    }, {headers: {"x-token": sessionStorage.getItem("token-xL")}})
        .then( (resp) => {
            toast.success(resp.data.resData, {
                duration: 3000,
                position: "top-right",
                style: {
                    background: "rgb(33, 157, 192)",
                    color: "#fff",
                    height: "4rem"
                }
            });
        })
        .catch( error =>{
                toast.error(`${error.response.data.error} \n ${error.response.data.errorLambda}`,{
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

export default useUpdatePeopleType
