import axios from "axios";
import toast from "react-hot-toast";

export const useGetMoistureSensorData = async (url, { setReadings, setNextPage, setPrevPage }) => {
  await axios(url, { headers: { "x-token": sessionStorage.getItem('token-xL') } })
    .then(resp => resp.data.resData)
    .then(data => {
      if (setReadings) setReadings(data);
      if (setNextPage) setNextPage(data.nextPage);
      if (setPrevPage) setPrevPage(data.prevPage);
    })
    .catch(error => {
      console.log(error);
      toast.error(`${error.response?.data?.error || 'Error al obtener lecturas'}`, {
        duration: 4000,
        position: "top-right",
        style: { background: "rgb(33, 157, 192)", color: "#fff", height: "4rem" },
      });
    });
};
