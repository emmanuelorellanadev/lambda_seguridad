// Utilidades para estandarizar el manejo de paginación en respuestas API
// Espera una estructura resData del backend con:
// { data, total, prevPage, nextPage, currentPage, limit, search }

export function applyPaginationResponse(dispatch, resData) {
  if (!dispatch || !resData) return;
  const {
    data = [],
    total = 0,
    prevPage = '',
    nextPage = '',
    currentPage = 1,
    limit = 10,
    search = ''
  } = resData;

  dispatch({ type: 'UPDATE_PREV', prevPage });
  dispatch({ type: 'UPDATE_NEXT', nextPage });
  dispatch({ type: 'UPDATE_PAGE', page: currentPage });
  dispatch({ type: 'UPDATE_ROWSBYPAGE', rowsByPage: limit });
  dispatch({ type: 'UPDATE_TOTAL', total });
  dispatch({ type: 'UPDATE_SEARCH', search });
  dispatch({ type: 'UPDATE_DATA', data });
}
