import axios from "axios";
import toast from "react-hot-toast";

export const useUpdatePass = async(urlUser, pass, passConfirm, userName, RoleId ) => {
    //check if the passwords are the same
    if (pass != passConfirm){
        toast.error('Error. Las contraseñas no coinciden.',{
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
            "user_name": userName,
            "user_pass": pass,
            "user_state": true,
            "RoleId": RoleId,
        },
        {
            headers: { "x-token": sessionStorage.getItem("token-xL") }
        })
        .then( () => {
            toast.success('Contraseña actualizada correctamente.',{
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
            console.log(error.response.data);
            toast.error('Error al actualizar la contraseña.',{
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
}