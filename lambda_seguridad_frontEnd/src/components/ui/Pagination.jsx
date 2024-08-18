import React from 'react'

import { Label } from './Label';

const Pagination = ({page, setPage, rowsByPage, setRowsByPage, prevPage, nextPage, total, setOnLoad}) => {

    const nextPageBtn = () => {
        if (nextPage){
            setPage(page+1);
            setOnLoad(false);
        }

      }
    
      const prevPageBtn = () => {
        if(prevPage && page > 1){
            setPage(page-1);
            setOnLoad(false);
        }
      }

    return(
        <>
            <div className='pagination_container'>
        <div>
            <button className='btn btn-primary' id='prevPage_button' onClick={  prevPageBtn }>Anterior</button>
            <label htmlFor="">{`${page} / ${Math.ceil(total/rowsByPage)}`}</label>
            <button className='btn btn-primary' onClick={ nextPageBtn }>Siguiente</button>
        </div>
        <div>
            <Label lambdaClassLabel={""} text={"Registros por página "}/>
            <select value={rowsByPage} onChange={e => {setRowsByPage(e.target.value); setOnLoad(false) }}>
            <option key={"10"} value="10">10</option>
            <option key={"20"} value="20">20</option>
            <option key={"50"} value="50">50</option>
            </select>
        </div>
        </div>
        </>
    )
}

export default Pagination;