import axios from 'axios'
import toast from 'react-hot-toast';
import Swal from 'sweetalert2'

export const useDeletePersonType = async(urlPersonType, token, { setOnLoad }) => {

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
        await axios.delete(urlPersonType, {headers: {"x-token": token}})
        .then( (resp) => {
            setOnLoad(true);
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
            toast.error(`${error.request.data.error}\n${error.request.data.errorLambda}`, {
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
