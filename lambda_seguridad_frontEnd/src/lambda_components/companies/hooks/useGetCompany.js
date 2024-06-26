import axios from "axios";
import toast from "react-hot-toast";

export const useGetCompany = async( urlCompany, { setCompanies, setCompany, setAddress, setPhone, setDescription, setMission, setVision, setLogo, setOnLoad}) => {
  await axios(urlCompany, { headers: {"x-token": sessionStorage.getItem('token-xL')}})
    .then( resp => resp.data.resData )
    .then( data => {
      if(setCompanies){
        setOnLoad(false)
        setCompanies( data ) 
      }else if(setCompany){
        setCompany(data.company_name), 
        setAddress(data.company_address),
        setPhone(data.company_phone)
        setDescription(data.company_description)
        setMission(data.company_mission)
        setVision(data.company_vision)
        setLogo(data.company_logo)
      }
    })
    .catch( error => {
      console.log(error)
      toast.error("Error al recuperar Empresa", {
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