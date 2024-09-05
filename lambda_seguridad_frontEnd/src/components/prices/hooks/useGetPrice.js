import axios from "axios";
import toast from "react-hot-toast";

export const useGetPrice = async(urlPrice, {setId, setPrice, setPriceState, setPrices, setPrevPage, setNextPage}) => {
    await axios.get( urlPrice, { headers: {"x-token": sessionStorage.getItem("token-xL")}})
        .then(resp => resp.data.resData)
        .then(data => {
            if(setPrices){
                setPrices(data);
                setPrevPage(data.prevPage);
                setNextPage(data.nextPage);
            }else if(setPrice){
                setId(data.id);
                setPrice(data.room_price);
                setPriceState(data.room_price_state);
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