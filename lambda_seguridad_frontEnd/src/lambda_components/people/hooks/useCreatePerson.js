import axios from 'axios';
import toast from 'react-hot-toast';

export const useCreatePerson = async(urlPerson, names, surNames, cui, nit, phone, address, personTypeId, branchId) => {

    await axios.post(urlPerson, {
        "person_names": names,
        "person_surnames": surNames,
        "person_cui": cui,
        "person_nit": nit,
        "person_phone": phone,
        "person_address": address,
        "PersonTypeId": personTypeId,
        "BranchId": branchId
        }, {headers: {"x-token": sessionStorage.getItem('token-xL')}})
        .then(() => {
            toast.success('Persona guardada exitosamente.',{
                duration: 3000,
                position: "top-right",
                style: {
                    background: "rgb(33, 157, 192)",
                    color: "#ffff",
                    height: "4rem"
                }
            })
        })
        .catch(error => {
            toast.error('Error al guardar la persona.',{
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


