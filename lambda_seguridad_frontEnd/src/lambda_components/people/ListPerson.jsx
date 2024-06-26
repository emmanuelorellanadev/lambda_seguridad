import React, { useEffect, useState } from 'react';
import { Toaster }from 'react-hot-toast';

import '../../css/person/person.css';
import { P_Head } from '../ui/P_Head';
import { Table_person } from '../ui/table_person/Table_person';
import { useGetPerson } from './hooks/useGetPerson';
import { useDeletePerson } from './hooks/useDeletePerson';


const ListPerson = (props) => {

  const [ people, setPeople ] = useState([]);
  const [ onLoad, setOnLoad ] =useState(true);

  const editPerson = (personId) => {
    props.navEditPerson(personId)
  }

  const deletePerson = async(personId) => {
    const urlPerson = `http://localhost:8080/person/${personId}`
    useDeletePerson(urlPerson, personId, {setOnLoad})

    
  }

  useEffect( () => {
    const urlPerson = 'http://localhost:8080/person';
    useGetPerson(urlPerson, {setPeople, setOnLoad})
  }, [onLoad])

  return (
    <>
      <div className='person_container'>
        <div>
          <P_Head className={'p_h1'} text={'Listado de Personas'}/>
        </div>
        <div className='table-responsive personTable_container'>
          <Table_person columns={["Id", "Nombres", "Apellidos", "CUI", "NIT", "Teléfono,", "Dirección"]} rows={people} editData={editPerson} deleteData={deletePerson} />
        </div>
      </div>
      <Toaster/>
    </>
  )
}

export default ListPerson
