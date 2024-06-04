import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios';

import '../../css/person/person.css';
import { P_Head } from '../ui/P_Head'


const ListPerson = (props) => {

  const [people, setPeople] = useState([]);

  const fetchData = async() => {
    const url = 'http://localhost:8080/person'

    await axios.get(url, {headers: {"x-token": sessionStorage.getItem('token-xL') }})
      .then( resp => setPeople(resp.data.resData))
      .catch( error => console.log(error))

  }

  const editPerson = (id) => {
    props.navEditPerson(id)
  }

  const deletePerson = async(id) => {
    const url = `http://localhost:8080/person/${id}`

    Swal.fire({
      icon: 'question',
      text: `Seguro que desea eliminar el registro ?`,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#dc3545'
  }).then( async(result) => {
    if ( result.isConfirmed ) {

    await axios.delete(url, id, {headers: {"x-token": sessionStorage.getItem("token-xL")}})
      .then( () => {
        Swal.fire({
          icon: 'success',
          text: 'Usuario eliminado correctamente',
          confirmButtonColor: '#0d6efd',
          timer: 3000
      })
      })
      .catch( error => console.log(error))
    }

  })
    
  }

  useEffect( () => {
    fetchData();
  }, [people])

  return (
    <>
      <div className='person_container'>
        <div>
          <P_Head className={'p_h1'} text={'Listado de Personas'}/>
        </div>
        <div className='table-responsive personTable_container'>
          <table className='table table-bordered table-hover'>
            <thead className='text-center t_header'>
              <tr>
                <th>Id</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>CUI</th>
                <th>NIT</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Eliminar</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {
                people.map( person => {
                  return ( <tr key={person.id}>
                    <th>{person.id}</th>
                    <th>{person.person_names}</th>
                    <th>{person.person_surnames}</th>
                    <th>{person.person_cui}</th>
                    <th>{person.person_nit}</th>
                    <th>{person.person_phone}</th>
                    <th>{person.person_address}</th>
                    <th><button className='btn btn-primary' onClick={() => editPerson(person.id)}>Editar</button></th>
                    <th><button className='btn btn-outline-danger' onClick={() => deletePerson(person.id)}><i className='bi bi-trash3-fill'></i></button></th>
                    </tr>)
                })
              }
            </tbody>
          </table>
        </div>
      </div>

    </>
  )
}

export default ListPerson
