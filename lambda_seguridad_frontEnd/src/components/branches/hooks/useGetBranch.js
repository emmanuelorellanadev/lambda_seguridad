import axios from "axios";
import { toast } from 'react-hot-toast'


export const useGetBranch = async (
    urlBranch,
    token,
    paginationDispatch,
    branchDispatch
) => {
    await axios
        .get(urlBranch, { headers: { 'x-token': token } })
        .then((resp) => resp.data.resData)
        .then((data) => {
            if (data?.data) {
                if (typeof paginationDispatch === 'function') {
                    paginationDispatch({ type: 'UPDATE_PREV', prevPage: data.prevPage });
                    paginationDispatch({ type: 'UPDATE_NEXT', nextPage: data.nextPage });
                    paginationDispatch({ type: 'UPDATE_PAGE', page: data.currentPage });
                    paginationDispatch({ type: 'UPDATE_ROWSBYPAGE', rowsByPage: data.limit });
                    paginationDispatch({ type: 'UPDATE_TOTAL', total: data.total });
                    paginationDispatch({ type: 'UPDATE_SEARCH', search: data.search ?? '' });
                    paginationDispatch({ type: 'UPDATE_DATA', data: data.data });
                } else if (paginationDispatch && paginationDispatch.setBranches) {
                    paginationDispatch.setBranches?.(data);
                    paginationDispatch.setNextPage?.(data.nextPage);
                    paginationDispatch.setPrevPage?.(data.prevPage);
                }
            } else if (branchDispatch && data) {
                if (typeof branchDispatch === 'function') {
                    branchDispatch({
                        type: 'SET_ALL',
                        payload: {
                            branch: data.branch_name ?? '',
                            address: data.branch_address ?? '',
                            phone: data.branch_phone ?? '',
                            state: typeof data.branch_state === 'boolean'
                                ? data.branch_state
                                : !!data.branch_state,
                            branchTypeId: data.BranchTypeId ?? '',
                        },
                    });
                } else {
                    branchDispatch.setBranch?.(data.branch_name);
                    branchDispatch.setAddress?.(data.branch_address);
                    branchDispatch.setPhone?.(data.branch_phone);
                    branchDispatch.setState?.(data.branch_state);
                    branchDispatch.setBranchTypeId?.(data.BranchTypeId);
                    branchDispatch.setCompanyId?.(data.CompanyId);
                }
            }
        })
        .catch((error) => {
            console.log(error);
            toast.error('Error al recuperar las sucursales', {
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