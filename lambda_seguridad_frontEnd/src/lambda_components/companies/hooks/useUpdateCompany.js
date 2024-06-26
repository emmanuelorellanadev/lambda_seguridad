import axios from 'axios';
import { toast } from 'react-hot-toast';

export const useUpdateCompany = async(urlCompany, logoFile) => {

    const companyData = new FormData(document.querySelector('.company_form'))
    companyData.append('img', logoFile);

    axios.put(urlCompany, 
        companyData,
        {headers: {"x-token": sessionStorage.getItem("token-xL")}})
    .then( () => {
        toast.success('Empresa actualizada correctamente', {
            duration: 3000,
            position: "top-right",
            style: {
                background: "rgb(33, 157, 192)",
                color: "#ffff",
                height: "75px"
            }
        })
    })
    .catch( error => {
        console.log(error)
        toast.error('Error al guardar la Empresa', {
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