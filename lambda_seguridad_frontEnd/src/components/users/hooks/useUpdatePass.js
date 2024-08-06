import axios from "axios";
import toast from "react-hot-toast";

export const useUpdatePass = async(urlUser, pass, passConfirm, currentPass) => {
    //check if the passwords are the same
    if (pass != passConfirm){
        toast.error('Error. Las contraseñas no coinciden. \n Intentalo de nuevo.',{
            duration: 3000,
            position: "top-right",
            style: {
                background: "rgb(33, 157, 192)",
                color: "#ffff",
                height: "4rem"
            }
        })
    }else{
        // Update password of logged user
        await axios.put(urlUser, {
            "user_pass": pass,
            "current_pass": currentPass
        },
        {
            headers: { "x-token": sessionStorage.getItem("token-xL") }
        })
        .then( (resp) => {
            toast.success(resp.data.resData,{
                duration: 3000,
                position: "top-right",
                style: {
                    background: "rgb(33, 157, 192)",
                    color: "#ffff",
                    height: "4rem"
                }
            })
        })
        .catch( (error) => {
            toast.error(`${error.response.data.error}`,{
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
}