import '../../css/ui/headings.css'; //hadle p_h1, p_h2, p_h3
import React, { useContext, useEffect, useState } from 'react';
import { Toaster }from 'react-hot-toast';

import '../../css/person/person.css';
import { P_Head } from '../ui/P_Head';
import { Table_person } from '../ui/tables/Table_person';
import { useDeletePerson } from './hooks/useDeletePerson';
import { GlobalContext } from '../../context/GlobalContext';


const ListPerson = (props) => {

  const { urlLambda } = useContext(GlobalContext);
  const [ onLoad, setOnLoad ] =useState(true);

  const editPerson = (personId) => {
    props.navEditPerson(personId)
  }

  const deletePerson = async(personId) => {
    const urlPerson = `${urlLambda}/person/${personId}`
    useDeletePerson(urlPerson, personId, {setOnLoad})
  }

  return (
    <>
      <div className='person_container'>
        <div>
          <P_Head className={'p_h1'} text={'Listado de Personas'}/>
        </div>
        <div className='table-responsive personTable_container'>
          <Table_person columns={["Id", "Nombres", "Apellidos", "CUI", "NIT", "Teléfono,", "Dirección"]} editData={editPerson} deleteData={deletePerson} onLoad={onLoad} setOnLoad={setOnLoad} />
        </div>
      </div>
      <Toaster/>
    </>
  )
}

export default ListPerson
