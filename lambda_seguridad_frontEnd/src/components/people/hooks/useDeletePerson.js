import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export const useDeletePerson = async(urlPerson, id, {setOnLoad}) => {
    Swal.fire({
        icon: 'question',
        text: `Seguro que desea eliminar el registro ?`,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#0d6efd',
        cancelButtonColor: '#dc3545'
    }).then( async(result) => {
        if ( result.isConfirmed ) {
            await axios.delete(urlPerson, id, {headers: {"x-token": sessionStorage.getItem("token-xL")}})
            .then( (resp) => {
                setOnLoad(false)
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
            .catch( error => {
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
    })
}