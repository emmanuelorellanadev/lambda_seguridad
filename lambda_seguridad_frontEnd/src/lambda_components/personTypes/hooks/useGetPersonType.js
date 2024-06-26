import axios from 'axios';
import toast from 'react-hot-toast';

const useGetPersonType = async( urlPersonType, {setId, setPersonTypeName, setPersonTypeState, setPersonTypes} ) => {

    await axios.get(urlPersonType, {headers:{"x-token": sessionStorage.getItem("token-xL")}})
        .then( resp => resp.data.resData)
        .then( data => {
            if(setPersonTypes){
                setPersonTypes(data)
            }else{
                setId(data.id)
                setPersonTypeName(data.personType_name)
                setPersonTypeState(data.personType_state)
            }
        })
        .catch (error => {
            console.log(error)
            toast.error("Error al recuperar tipos de persona.", {
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

export default useGetPersonType;