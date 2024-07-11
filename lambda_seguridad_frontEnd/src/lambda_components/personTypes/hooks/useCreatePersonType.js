import axios from 'axios';
import toast from 'react-hot-toast';

const useCreatePersonType = async (url, personTypeName, personTypeState, {setOnLoad}) => {

    await axios.post(url, {
        "personType_name": personTypeName,
        "personType_state": personTypeState
    }, {headers:{"x-token": sessionStorage.getItem("token-xL")}})
        .then( (resp) => {
            setOnLoad(false)
            toast.success(resp.data.resData, {
                duration: 4000,
                position: "top-right",
                style: {
                    background: "rgb(33, 157, 192)",
                    color: "#fff",
                    height: "4rem"
                }
            });
        })
        .catch( error =>{
            console.log(error)
                toast.error(`${error.response.data.errors} \n ${error.response.data.errorLambda}`,{
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

export default useCreatePersonType;