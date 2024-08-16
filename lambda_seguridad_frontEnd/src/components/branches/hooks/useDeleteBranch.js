import axios from "axios"
import Swal from "sweetalert2"
import { toast } from "react-hot-toast"

export const useDeleteBranch = async(id, branch_name, setOnLoad) => {

        const urlBranchToDelete =`http://localhost:8080/branch/${id}`;

        Swal.fire({
            icon: 'question',
            text: `Seguro que desea eliminar la sucursal ${branch_name} ?`,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            confirmButtonColor: '#0d6efd',
            cancelButtonColor: '#dc3545'
        }).then( async( result ) => {
            if ( result.isConfirmed ) {
                await axios.delete(urlBranchToDelete, {
                    data: {"id": id}, 
                    headers:{'x-token': sessionStorage.getItem('token-xL')}
                } )  
                .then( () => {
                    setOnLoad(false);
                    toast.success("Sucursal eliminada correctamente", {
                      duration: 4000,
                      position: "top-right",
                      style: {
                          background: "rgb(33, 157, 192)",
                          color: "#fff",
                          height: "4rem"
                      }
                    });
                })
                .catch( error => {
                    console.log(error)
                    setOnLoad(false);
                    toast.success("Error al eliminar la sucursal", {
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