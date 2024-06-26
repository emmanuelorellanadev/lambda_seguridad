import axios from 'axios';
import toast from 'react-hot-toast';

export const useGetPerson = async(urlPerson, {setPeople, setNames, setSurNames, setCui, setNit, setPhone, setAddress, setPersonTypeId, setBranchId, setOnLoad }) => {
    await axios.get(urlPerson, {headers: {"x-token": sessionStorage.getItem('token-xL') }})
    .then( resp => resp.data.resData)
    .then( data => {
        if(setPeople){
            setPeople(data);
            setOnLoad(false);
        }else if(setNames){
            setNames(data.person_names)
            setSurNames(data.person_surnames)
            setCui(data.person_cui)
            setNit(data.person_nit)
            setPhone(data.person_phone)
            setAddress(data.person_address)
            setPersonTypeId(data.PersonTypeId)
            setBranchId(data.BranchId)
        }
    })
    .catch( error => {
        console.log(error)
        toast.error('Error al recuperar Persona.',{
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