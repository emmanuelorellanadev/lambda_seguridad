import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";


export const useDeleteBranchType = async(urlBranchType, id, branchType, setOnLoad) => {
    
    // await axios.get(urlBranchType, { headers: {"x-token": sessionStorage.getItem("token-xL")}})
    //   .then( resp => resp.data.resData )
    //   .then(role => setBranchTypeToDelete(role) )
    //   .catch( error => console.log(error));

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
            await axios.delete(urlBranchType, {where: {id: id}})
              .then( () => {
                setOnLoad(false)
                toast.success("Tipo de Sucursal eliminado exitosamente", {
                    duration: 4000,
                    position: "top-right",
                    style: {
                        background: "rgb(33, 157, 192)",
                        color: "#fff",
                        height: "4rem"
                    }
                  })
              })
              .catch(error => {
                console.log(error)
                toast.error("Error al eliminar el tipo de sucursal", {
                    duration: 4000,
                    position: "top-right",
                    style: {
                        background: "rgb(33, 157, 192)",
                        color: "#fff",
                        height: "4rem"
                    }
                })
              })
            //   fillTable();
          }
        })
}