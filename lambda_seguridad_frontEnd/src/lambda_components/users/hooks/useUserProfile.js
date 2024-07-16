import axios from "axios";
import toast from "react-hot-toast";


export const useUserProfile = async(urlUser, {setUserName, setUserCreation, setUserImg}) => {
    await axios.get( urlUser, { headers: {"x-token": sessionStorage.getItem("token-xL")}})
        .then(resp => resp.data.resData)
        .then( data => {
            setUserName(data.user_name)
            setUserCreation(data.user_creation)
            setUserImg(data.user_img)
        })
        .catch(error => {
            console.log(error)
            toast.error(`${error.response.data.error} \n ${error.response.data.errorLambda}`,{
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