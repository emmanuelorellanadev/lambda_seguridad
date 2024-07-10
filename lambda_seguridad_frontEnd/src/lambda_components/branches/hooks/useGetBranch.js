import axios from "axios";
import { toast } from 'react-hot-toast'


export const useGetBranch = async(urlBranch, { setBranches, setId, setBranch, setAddress, setPhone, setState, setBranchTypeId, setCompanyId  }) => {
    await axios.get(urlBranch, 
      { headers: {'x-token': sessionStorage.getItem('token-xL')} })
        .then( resp => resp.data.resData)
        .then( data => { 
            if(setBranches){
                setBranches(data)
            } else if(setBranch){
                setId(data.id)
                setBranch(data.branch_name)
                setAddress(data.branch_address)
                setPhone(data.branch_phone)
                setState(data.branch_state)
                setBranchTypeId(data.BranchTypeId)
                setCompanyId(data.CompanyId)
            }
        })
        .catch( error => {
            console.log(error)
            toast.error("Error al recuperar las sucursales", {
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