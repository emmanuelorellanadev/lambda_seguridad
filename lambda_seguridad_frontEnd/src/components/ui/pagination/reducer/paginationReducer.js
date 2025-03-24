
export const initialPagination = {
    prevPage: '',
    nextPage: '',
    page: 1,
    rowsByPage: 10,
    total: '',
    search: '',
    data: []
}

export function paginationReducer (state, action) {
    switch (action.type){
        case "UPDATE_NEXT": {
            return {
                ...state,
                nextPage : action.nextPage
            }
        }

        case "UPDATE_PREV": {
            return {
                ...state,
                prevPage: action.prevPage
            }
        }

        case "UPDATE_PAGE": {
            return {
                ...state,
                page: action.page
            }
        }

        case "UPDATE_ROWSBYPAGE": {
            return {
                ...state,
                rowsByPage: action.rowsByPage
            }
        }

        case "UPDATE_TOTAL": {
            return ( {
                ...state,
                total: action.total
            } )
        }

        case "UPDATE_SEARCH": {
            return ( {
                ...state,
                search: action.search
            } )
        }

        case "UPDATE_DATA": {
            return ( {
                ...state,
                data: action.data
            } )
        }

        case "RESET": {
            return ( {
                prevPage: '',
                nextPage: '',
                limit: '',
                total: '',
                page: '',
                rowsByPage: ''
            } )
        }
        default: return state
    }
}

