import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";


export const useDeleteRole = async(urlRole, id, { setOnLoad }) => {

    Swal.fire({
      icon: 'question',
      title: `Esta seguro que desea eliminar el rol?`,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#dc3545'
    })
      .then( async (result) =>{
        if( result.isConfirmed ){
          await axios.delete(urlRole, {where: {id: id}})
            .then( () => {
                setOnLoad(false)
                toast.success("Rol eliminado correctamente.", {
                    duration: 4000,
                    position: "top-right",
                    style: {
                        background: "rgb(33, 157, 192)",
                        color: "#fff",
                        height: "4rem"
                    }
                });
            })
            .catch(error => {
                console.log(error)
                toast.error("Error al eliminar el Rol.", {
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