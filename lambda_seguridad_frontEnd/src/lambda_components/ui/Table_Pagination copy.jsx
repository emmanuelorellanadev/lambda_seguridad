import React, {useState, useEffect} from 'react'

export const Table_Pagination = ({ columns, rows, ...props}) => {

  const botonAtrasDOM = document.querySelector("#atras");
  const informacionPaginaDOM = document.querySelector("#informacion-pagina");
  const botonSiguienteDOM = document.querySelector("#siguiente");

  const [rebanadaDatos, setRebanadaDatos] = useState([])
  const [paginaActual, setPaginaActual] = useState(1);

  const elementosPorPagina = 2;
  


//check why the paginaActual doesnt work 
//show diferent data if back or if continue and doesnt fill the table at the begining



  // let paginaActual = 1;
  const avanzarPagina = async() => {
    // Incrementar "paginaActual"
    // paginaActual = (paginaActual + 1);
    await setPaginaActual( paginaActual + 1)
    console.log(paginaActual)
    // Redibujar
    renderizar();
  }

  const retrocederPagina = async() => {
    // Disminuye "paginaActual"
    // paginaActual = (paginaActual - 1);
    await setPaginaActual( paginaActual - 1)
    console.log(paginaActual)
    // Redibujar
    renderizar();
  }

  const obtenerRebanadaDeBaseDeDatos = () => {
    const corteDeInicio = (paginaActual - 1) * elementosPorPagina;
    const corteDeFinal = corteDeInicio + elementosPorPagina;
    console.log(rows.slice(corteDeInicio, corteDeFinal));
    return rows.slice(corteDeInicio, corteDeFinal);
  }

  const obtenerPaginasTotales = () => {
    return Math.ceil(rows.length / elementosPorPagina);
  }

  // function gestionarBotones() {
  //   // Comprobar que no se pueda retroceder
  //   if (paginaActual === 1) {
  //     botonAtrasDOM.setAttribute("disabled", true);
  //   } else {
  //     botonAtrasDOM.removeAttribute("disabled");
  //   }
  //   // Comprobar que no se pueda avanzar
  //   if (paginaActual === obtenerPaginasTotales()) {
  //     botonSiguienteDOM.setAttribute("disabled", true);
  //   } else {
  //     botonSiguienteDOM.removeAttribute("disabled");
  //   }
  // }

  const renderizar = async() => {
    // Limpiamos los artículos anteriores del DOM
    // listadoArticulosDOM.innerHTML = "";
    // Obtenemos los artículos paginados
    // const rebanadaDatos = obtenerRebanadaDeBaseDeDatos(paginaActual);
    await setRebanadaDatos(obtenerRebanadaDeBaseDeDatos());
    //// Dibujamos
    // Deshabilitar botones pertinentes (retroceder o avanzar página)
    // gestionarBotones();
    // Informar de página actual y páginas disponibles
    // informacionPaginaDOM.value = `${paginaActual}/${obtenerPaginasTotales()}`;
    // document.querySelector('#informacion-pagina').value = `${paginaActual}/${obtenerPaginasTotales}`;
    document.querySelector('#informacion-pagina').value = `${paginaActual}/${obtenerPaginasTotales()}`;

    // Crear un artículo para cada elemento que se encuentre en la página actual
    // rebanadaDatos.forEach(function (datosArticulo) {
      // Clonar la plantilla de artículos
      // const miArticulo = plantillaArticulo.cloneNode(true);
      // Rellenamos los datos del nuevo artículo
      // const miTitulo = miArticulo.querySelector("#titulo");
      // miTitulo.textContent = datosArticulo.title;
      // const miCuerpo = miArticulo.querySelector("#cuerpo");
      // miCuerpo.textContent = datosArticulo.body;
      // Lo insertamos dentro de "listadoArticulosDOM"
      // listadoArticulosDOM.appendChild(miArticulo);
    // });
  }

  // botonAtrasDOM.addEventListener("click", retrocederPagina);
	//  botonSiguienteDOM.addEventListener("click", avanzarPagina);

	 // --
	 // Inicio
	 // --
	useEffect( () => {
    // setRebanadaDatos(obtenerRebanadaDeBaseDeDatos(paginaActual));
    // document.querySelector('#informacion-pagina').value = `${paginaActual}/${obtenerPaginasTotales}`;
    renderizar();
  }, [])

  return (
    <>
    <table className='table table-bordered table-hover table-striped' >
      <thead className='text-center t_header'>
        <tr key={'0'}>
          {
            columns.map( (column) => {
              return <th>{column}</th>
            })
          }
        </tr>      
      </thead>
      <tbody className='text-center align-baseline'>
        {
          rebanadaDatos.map( ( branch ) => {
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
            })
        }
      </tbody>
      
  </table>
  <div>
	<button id="atras" onClick={retrocederPagina}>👈</button>
	{/* <span id="informacion-pagina"></span> */}
  <input type="text" id='informacion-pagina'/>
	<button id="siguiente" onClick={avanzarPagina}>👉</button>
    </div>
     
  </>
  )
}

export default Table_Pagination