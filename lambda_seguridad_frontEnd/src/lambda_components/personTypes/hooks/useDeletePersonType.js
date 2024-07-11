import axios from 'axios'
import toast from 'react-hot-toast';
import Swal from 'sweetalert2'

export const useDeletePersonType = async(id, { setOnLoad }) => {
    const url = `http://localhost:8080/personType/${id}`;


    Swal.fire({
        icon: 'question',
        title: `Esta seguro que desea eliminar el Tipo de Persona?`,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#0d6efd',
        cancelButtonColor: '#dc3545'
      })
        .then( async (result) =>{
          if( result.isConfirmed ){
    await axios.delete(url, {headers: {"x-token": sessionStorage.getItem("token-xL")}})
        .then( (resp) => {
            setOnLoad(false);
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
            console.log(error)
            toast.error(`${error.request.data.errors}\n${error.request.data.errorLambda}`, {
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
})
}
export default useDeletePersonType
