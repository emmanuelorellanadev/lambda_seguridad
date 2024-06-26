import axios from 'axios';
import { toast } from 'react-hot-toast'

export const createCompany = async(logo) => {
        
    const url = 'http://localhost:8080/company';

    const companyData = new FormData(document.querySelector('#CreateCompany_form'));
    companyData.append('img', logo);

    await axios.post(url, companyData,
        {
            headers: {'x-token': sessionStorage.getItem('token-xL')}
        }).then( () => {
            toast.success('Empresa guardada exitosamente',{
                duration: 3000,
                position: "top-right",
                style: {
                    background: "rgb(33, 157, 192)",
                    color: "#ffff",
                    height: "4rem"
                }
            })
        }).catch(error => {
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