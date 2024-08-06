import axios from 'axios';
import { toast } from 'react-hot-toast';
import Swal from "sweetalert2";


export const useDeleteRoomState = async (urlRoomState, setOnLoad ) => {

    Swal.fire({
        icon: 'question',
        title: `Esta seguro que desea eliminar el Estado?`,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#0d6efd',
        cancelButtonColor: '#dc3545'
      })
        .then( async (result) =>{
          if( result.isConfirmed ){
            await axios.delete(urlRoomState, {headers: {"x-token": sessionStorage.getItem("token-xL")}})
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
              .catch(error => {
                  console.log(error)
                  toast.error(`${error.response.data.error} \n ${error.response.data.errorLambda}`, {
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