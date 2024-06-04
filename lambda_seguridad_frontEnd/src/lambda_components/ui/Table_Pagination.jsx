import React, {useState, useEffect} from 'react'

import { Label } from './Label';

export const Table_Pagination = ({ columns, rows, ...props}) => {

  const [rebanadaDatos, setRebanadaDatos] = useState([])
  const [paginaActual, setPaginaActual] = useState(1);
  const [paginasTotales, setPaginasTotales] = useState(0);
  const elementosPorPagina = 4;
  
  const avanzarPagina = () => {
    setPaginaActual( paginaActual + 1)
  }

  const retrocederPagina = () => {
    setPaginaActual( paginaActual - 1)
  }

  const obtenerRebanadaDeBaseDeDatos = () => {
    const corteDeInicio = (paginaActual - 1) * elementosPorPagina;
    const corteDeFinal = corteDeInicio + elementosPorPagina;
    // return rows.slice(corteDeInicio, corteDeFinal);
    setRebanadaDatos(rows.slice(corteDeInicio, corteDeFinal));
  }

  const renderizar = async() => {
    console.log('obteneiendo datos de pagina')
    const number = (rows.length / elementosPorPagina) 
    const num = await (Math.ceil(number));
    // await setPaginasTotales(Math.ceil(number))
    console.log(num);
    setPaginasTotales(num);
    obtenerRebanadaDeBaseDeDatos();
  }

	useEffect( () => {
    renderizar();
    // console.log(`Pagina actual ${paginaActual}`)
    // console.log(`Paginas Totales ${paginasTotales}`)
  }, [paginaActual])

  return (
    <>
      <table className='table table-bordered table-hover table-striped' >
        <thead className='text-center t_header'>
          <tr key={'0'}>
            {
              columns.map( (column) => {
                return <th key={column}>{column}</th>
              })
            }
          </tr>      
        </thead>
        <tbody className='text-center align-baseline'>
          {
            rebanadaDatos.map( ( branch ) => {
              let values = Object.values(branch)
                  return (
                  <tr key={values[0]}>
                  <th >{values[0]}</th>
                  <th >{values[1]}</th>
                  <th >{values[2]}</th>
                  <th >{values[3]}</th>
                  <th><button className='btn btn-primary' type="button" onClick={ () => props.editElement( values[0] ) } >Editar</button></th>
                  <th><button className='btn btn-outline-danger' onClick={ () => props.deleteElement(values[0], values[1]) }><i className='bi bi-trash3-fill'></i></button></th>
                </tr>)
              })
          }
        </tbody>
      </table>
    <div>
      <button id="atras" onClick={retrocederPagina}>Anterior</button>
      <input type="text" value={paginaActual} onChange={(e) => setPaginaActual(e.target.value)} className='text-center' />
      <Label text=" / "/>
      <input type="text" value={paginasTotales} onChange={(e) => setPaginasTotales(e.target.value)} className='text-center' />
      <button id="siguiente" onClick={avanzarPagina}>Siguiente</button>
    </div>
  </>
  )
}

export default Table_Pagination