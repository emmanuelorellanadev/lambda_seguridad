import axios from "axios";
import toast from "react-hot-toast";

export const useGetBranchUser = async(urlBranchUser, {setBranchData}) => {
    await axios.get( urlBranchUser, { headers: {"x-token": sessionStorage.getItem("token-xL")}})
        .then(resp => resp.data.resData)
        .then(data => setBranchData(data))
        .catch(error => {
            console.log(error);
            toast.error('Error SucursalUsuario.',{
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