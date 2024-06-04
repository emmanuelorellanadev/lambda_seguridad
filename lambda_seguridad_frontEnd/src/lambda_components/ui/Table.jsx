import React from 'react'
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';

export const Table = ({ columns, rows, ...props}) => {

  return (
    <table className='table table-bordered table-hover table-striped' >
      <thead className='text-center t_header'>
        <tr >
          {
            columns.map( (column) => {
              return <th>{column}</th>
            })
          }
        </tr>      
      </thead>
      <tbody className='text-center align-baseline'>
        {
          rows.map( ( branch ) => {
            let values = Object.values(branch)
            // if(props.deleteElement && props.editElement){
                return (<tr key={values[0]}>
                <th>{values[0]}</th>
                <th>{values[1]}</th>
                <th>{values[2]}</th>
                <th>{values[3]}</th>
                <th><button className='btn btn-primary' type="button" onClick={ () => props.editElement( values[0] ) } >Editar</button></th>
                <th><button className='btn btn-outline-danger' onClick={ () => props.deleteElement(values[0], values[1]) }><i className='bi bi-trash3-fill'></i></button></th>
              </tr>)
            // }else{
            //     return (<tr key={values[0]}>
            //     <th>{values[0]}</th>
            //     <th>{values[1]}</th>
            //     <th>{values[2]}</th>
            //     <th>{values[3]}</th>
            //   </tr>)
            // }
            })
        }
      </tbody>
  </table>
  )
}

export default Table