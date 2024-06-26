import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export const useCreateUser = async(urlUser, userImage, state, { setOnLoad }) => {
    const userData = new FormData(document.querySelector('#formCreateUser'));
            userData.append('img', userImage)
            userData.set('user_state', state);
            await axios.post(urlUser, userData,
                {   
                    headers: { "x-token": sessionStorage.getItem('token-xL') }
                })
                .then( response => {
                    if (response.data.resData) {
                        setOnLoad(false);
                        toast.success('Usuario creado exisotosamente.',{
                            duration: 3000,
                            position: "top-right",
                            style: {
                                background: "rgb(33, 157, 192)",
                                color: "#ffff",
                                height: "4rem"
                            }
                        })
                    }
                })
                .catch( (error) => {
                    console.log(error)
                    toast.error('Error al crear el Usuario.',{
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