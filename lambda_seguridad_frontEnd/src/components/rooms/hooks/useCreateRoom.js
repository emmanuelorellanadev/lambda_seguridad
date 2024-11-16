import axios from 'axios';
import { toast } from 'react-hot-toast'

export const useCreateRoom = async(urlRoom, createRoomData) => {
    //get the pricesid
    const idPrices = [];
    createRoomData?.prices.map( priceSelected => {
        idPrices.push(priceSelected.id)
    })
    //get the servicesid
    const idServices = [];
    createRoomData?.services.map( serviceSelected => {
        idServices.push(serviceSelected.id)
    })
    
    const roomData = {
        "room_number": createRoomData.room,
        "room_beds": createRoomData.beds,
        "room_people": createRoomData.maxPeople,
        "room_phone": createRoomData.phone,
        "room_info": createRoomData.info,
        "RoomStateId": createRoomData.stateId,
        "BranchId": createRoomData.branchId,
        "services": idServices,
        "prices": idPrices
    }

    await axios.post(urlRoom, roomData,
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