import axios from "axios"
import Swal from "sweetalert2"
import { Toaster, toast } from 'react-hot-toast'

export const useDeleteCompany = (urlCompany, companyId, companyName, setOnLoad) => {

    Swal.fire({
      icon: 'question',
      text: `Seguro que desea eliminar la empresa ${companyName} ?`,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#dc3545'
    }).then( async( result ) => {
      if ( result.isConfirmed ) {
          await axios.delete(urlCompany+companyId, {
            data: {"id": companyId},
            headers:{'x-token': sessionStorage.getItem('token-xL')}
            } )  
          .then( (resp) => {
            setOnLoad(false);
            toast.success(`${resp.data.resData}`, {
              duration: 3000,
              position: "top-right",
              style: {
                  background: "rgb(33, 157, 192)",
                  color: "#fff",
                  height: "4rem"
              }
            });
          })
          .catch( error => toast.error(`${error.response.data.errors}`, {
            duration: 4000,
            position: "top-right",
            style: {
                background: "rgb(33, 157, 192)",
                color: "#fff",
                height: "4rem"
            }
          }))
      }
  })

  }