import axios from "axios";
import toast from "react-hot-toast";

export const useGetCompany = async (
  urlCompany,
  token,
  paginationDispatch,
  companyDispatch
) => {
  await axios(urlCompany, { headers: { 'x-token': token } })
    .then((resp) => resp.data.resData)
    .then((data) => {
      if (data?.data) {
        if (typeof paginationDispatch === 'function') {
          paginationDispatch({ type: 'UPDATE_PREV', prevPage: data.prevPage });
          paginationDispatch({ type: 'UPDATE_NEXT', nextPage: data.nextPage });
          paginationDispatch({ type: 'UPDATE_PAGE', page: data.currentPage });
          paginationDispatch({ type: 'UPDATE_ROWSBYPAGE', rowsByPage: data.limit });
          paginationDispatch({ type: 'UPDATE_TOTAL', total: data.total });
          paginationDispatch({ type: 'UPDATE_SEARCH', search: data.search });
          paginationDispatch({ type: 'UPDATE_DATA', data: data.data });
        } else if (paginationDispatch && paginationDispatch.setCompanies) {
          paginationDispatch.setOnLoad?.(false);
          paginationDispatch.setCompanies?.(data);
          paginationDispatch.setNextPage?.(data.nextPage);
          paginationDispatch.setPrevPage?.(data.prevPage);
        }
      } else if (companyDispatch && data) {
        if (typeof companyDispatch === 'function') {
          companyDispatch({
            type: 'SET_ALL',
            payload: {
              company: data.company_name ?? '',
              address: data.company_address ?? '',
              phone: data.company_phone ?? '',
              description: data.company_description ?? '',
              mission: data.company_mission ?? '',
              vision: data.company_vision ?? '',
              logo: data.company_logo ?? '',
            },
          });
        } else {
          companyDispatch.setCompany?.(data.company_name);
          companyDispatch.setAddress?.(data.company_address);
          companyDispatch.setPhone?.(data.company_phone);
          companyDispatch.setDescription?.(data.company_description);
          companyDispatch.setMission?.(data.company_mission);
          companyDispatch.setVision?.(data.company_vision);
          companyDispatch.setLogo?.(data.company_logo);
        }
      }
    })
    .catch((error) => {
      console.log(error);
      toast.error(`${error?.response?.data?.error || 'Error al recuperar la empresa'}`, {
        duration: 4000,
        position: 'top-right',
        style: {
          background: 'rgb(33, 157, 192)',
          color: '#fff',
          height: '4rem',
        },
      });
    });
};