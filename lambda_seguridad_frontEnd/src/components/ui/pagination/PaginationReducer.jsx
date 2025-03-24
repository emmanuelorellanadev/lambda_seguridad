import React from 'react'

import { Label } from '../Label';

const PaginationReducer = ({data, dispatch, onLoad, setOnLoad}) => {

    const nextPageBtn = () => {
        if (data.nextPage){
            dispatch({ type: 'UPDATE_PAGE', page: (parseInt(data.page)+1) });
            setOnLoad(!onLoad);
        }
      }
    
      const prevPageBtn = () => {
        if(data.prevPage && data.page > 1){
            dispatch({type: 'UPDATE_PAGE', page: parseInt(data.page)-1 });
            setOnLoad(!onLoad);
        }
      }

    return(
        <>
    
        <div className='pagination_container'>
        <div>
            <button className='btn btn-primary' id='prevPage_button' onClick={  prevPageBtn }>Anterior</button>
            <label htmlFor="">{`${data.page} / ${Math.ceil(data.total/data.rowsByPage)}`}</label>
            <button className='btn btn-primary' onClick={ nextPageBtn }>Siguiente</button>
        </div>
        <div>
            <Label lambdaClassLabel={""} text={"Registros por página "}/>
            <select value={data.rowsByPage} onChange={e => { dispatch({type: 'UPDATE_ROWSBYPAGE', rowsByPage: e.target.value}); setOnLoad(!onLoad)  }}>
            <option key={"10"} value={10}>10</option>
            <option key={"20"} value={20}>20</option>
            <option key={"50"} value={50}>50</option>
            </select>
        </div>
        </div>
        </>
    )
}

export default PaginationReducer;