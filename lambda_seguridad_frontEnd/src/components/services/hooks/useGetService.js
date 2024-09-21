import axios from "axios";
import toast from "react-hot-toast";

export const useGetService = async(urlService, {setId, setServiceName, setServiceState, setServices, setPrevPage, setNextPage}) => {
    await axios.get( urlService, { headers: {"x-token": sessionStorage.getItem("token-xL")}})
        .then(resp => resp.data.resData)
        .then(data => {
            if(setServices){
                setServices(data);
                setPrevPage(data.prevPage);
                setNextPage(data.nextPage);
            }else if(setServiceName){
                setId(data.id);
                setServiceName(data.service_name);
                setServiceState(data.service_state);
            }
        })
        .catch(error => {
            console.log(error);
            toast.error('Error al recuperar los servicios.',{
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