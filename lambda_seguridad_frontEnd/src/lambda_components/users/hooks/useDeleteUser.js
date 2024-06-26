import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";


export const useDeleteUser = async(urlUser, userId, userName, { setOnLoad }) => {
    Swal.fire({
        icon: 'question',
        text: `Seguro que desea eliminar el usuario ${userName} ?`,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#0d6efd',
        cancelButtonColor: '#dc3545'
    }).then( async( result ) => {
        if ( result.isConfirmed ) {
            await axios.delete(urlUser, {data: {"id": userId}, headers:{'x-token': sessionStorage.getItem('token-xL')}} )  
            .then( () => {
                setOnLoad(false);
                toast.success('Usuario eliminado correctamente.',{
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
                toast.error('Error al eliminar Usuario.',{
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