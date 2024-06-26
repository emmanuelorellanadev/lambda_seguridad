import axios from 'axios';
import toast from 'react-hot-toast';

const useCreatePersonType = async (url, personTypeName, personTypeState, {setOnLoad}) => {

    await axios.post(url, {
        "personType_name": personTypeName,
        "personType_state": personTypeState
    }, {headers:{"x-token": sessionStorage.getItem("token-xL")}})
        .then( () => {
            setOnLoad(false)
            toast.success("Tipo de Persona Actualizado correctamente.", {
                duration: 4000,
                position: "top-right",
                style: {
                    background: "rgb(33, 157, 192)",
                    color: "#fff",
                    height: "4rem"
                }
            });
        })
        .catch( error =>{
            console.log(error)
            toast.error("Error al actualizar tipo de persona.", {
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

export default useCreatePersonType;