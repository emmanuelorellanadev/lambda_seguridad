import axios from "axios";
import toast from "react-hot-toast";

export const useUpdatePrice = async(urlPrice, id, price, priceState) => {

    await axios.put(urlPrice, {
        "id": id,
        "room_price": price,
        "room_price_state": priceState
    },  {
        headers: {"x-token": sessionStorage.getItem('token-xL')
    }})
        .then( (resp) => {
            toast.success(resp.data.resData, {
                duration: 3000,
                position: "top-right",
                style: {
                    background: "rgb(33, 157, 192)",
                    color: "#fff",
                    height: "4rem"
                }
              });
        })
        .catch( error => {
            toast.error(`${error.response.data.error} \n ${error.response.data.errorLambda}`, {
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