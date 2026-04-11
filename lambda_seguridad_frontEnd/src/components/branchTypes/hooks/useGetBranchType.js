import axios from "axios";
import toast from "react-hot-toast";

export const useGetBranchType = async (urlBranchType, token, paginationDispatch, branchTypeDispatch ) => {
    await axios
        .get(urlBranchType, { headers: { 'x-token': token } })
        .then((resp) => resp.data.resData)
        .then((data) => {
            if (data.data) {
                paginationDispatch({ type: 'UPDATE_PREV', prevPage: data.prevPage }),
                paginationDispatch({ type: 'UPDATE_NEXT', nextPage: data.nextPage }),
                paginationDispatch({ type: 'UPDATE_PAGE', page: data.currentPage }),
                paginationDispatch({ type: 'UPDATE_ROWSBYPAGE', rowsByPage: data.limit }),
                paginationDispatch({ type: 'UPDATE_TOTAL', total: data.total }),
                paginationDispatch({ type: 'UPDATE_SEARCH', search: data.search }),
                paginationDispatch({ type: 'UPDATE_DATA', data: data.data });
            } else {
                if (branchTypeDispatch && data) {
                    branchTypeDispatch({
                        type: 'SET_ALL',
                        payload: {
                            id: data.id ?? '',
                            branchTypeName: data.branchType_name ?? '',
                            branchTypeState:
                                typeof data.branchType_state === 'boolean'
                                    ? data.branchType_state
                                    : !!data.branchType_state,
                        },
                    });
                }
            }
        })
        .catch((error) => {
            console.log(error);
            toast.error('Error al recuperar los tipos de sucursal.', {
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