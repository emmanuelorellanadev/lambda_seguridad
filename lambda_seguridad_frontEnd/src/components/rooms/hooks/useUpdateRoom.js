import axios from 'axios';
import { toast } from 'react-hot-toast'

export const useUpdateRoom = async(urlRoom, roomData) => {
       
        //get the pricesid
        const idPrices = [];
        roomData?.prices.map( priceSelected => {
            idPrices.push(priceSelected.id)
        })
        //get the servicesid
        const idServices = [];
        roomData?.services.map( serviceSelected => {
            idServices.push(serviceSelected.id)
        })

    const roomDataUpdate = {
        "room_number": roomData.room,
        "room_beds": roomData.beds,
        "room_people": roomData.maxPeople,
        "room_phone": roomData.phone,
        "room_info": roomData.info,
        "RoomStateId": roomData.stateId,
        "BranchId": roomData.branchId,
        "services": idServices,
        "prices": idPrices
    }

    await axios.put(urlRoom, roomDataUpdate,
        {
            headers: {'x-token': sessionStorage.getItem('token-xL')}
        }).then( (resp) => {
            toast.success(`${resp.data.resData}`,{
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
            toast.error(`${error.response.data.error} \n ${error.response.data.errorLambda}`, {
                duration: 4000,
                position: "top-right",
                style: {
                    background: "rgb(33, 157, 192)",
                    color: "#ffff",
                    height: "4rem"
                }
            })
        })
}