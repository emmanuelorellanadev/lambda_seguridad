import axios from 'axios';
import toast from 'react-hot-toast';

export const useSearchPerson = async(urlPerson, createReservationDispatch) => {

    // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    // console.log( arr.reduce((acumulator, current)=> { console.log(acumulator); return acumulator + current}) );

    await axios.get(urlPerson, {headers: {"x-token": sessionStorage.getItem('token-xL') }})
    .then( resp => resp.data.resData)
    .then( data => {
        if(data.id){
            createReservationDispatch({type: "UPDATE_PERSON", PersonId: data.id});
            createReservationDispatch({type: "UPDATE_NAME", name: `${data.person_names} ${data.person_surnames}`});
            createReservationDispatch({type: "UPDATE_PHONE", phone: data.person_phone});
            createReservationDispatch({type: "UPDATE_CUI", cui: data.person_cui});
            createReservationDispatch({type: "UPDATE_NIT", nit: data.person_nit});
        }else{
            createReservationDispatch({type: "UPDATE_PEOPLELIST", peopleList: data.data});
        }
    })
    .catch( error => {
        console.log(error)
        toast('Cliente no encontrado. \n Registre nuevo cliente.',{
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