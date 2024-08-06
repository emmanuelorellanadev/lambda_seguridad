import React, { useEffect, useState } from 'react'

import '../../css/personType/personType.css'
import { P_Head } from '../ui/P_Head';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';

import useCreatePersonType from './hooks/useCreatePersonType';
import useGetPersonType from './hooks/useGetPersonType';
import Table_personType from '../ui/table_personType/Table_personType';
import useDeletePersonType from './hooks/useDeletePersonType';
import { Toaster } from 'react-hot-toast';

export const CreateListPeopleType = (props) => {
  
  const [personTypes, setPersonTypes] = useState([]);
  const [personTypeName, setPersonTypeName] = useState('');
  const [personTypeState, setPersonTypeState] =useState(true);
  const [onLoad, setOnLoad] = useState(false);

  
  const savePersonType = (e) => {
    e.preventDefault();
    const urlPersonType="http://localhost:8080/personType/";
    useCreatePersonType(urlPersonType, personTypeName, personTypeState, {setOnLoad});
    cleanForm();
  }

  const editPersonType = (id) => {
    props.navEditPersonType(id)
  }

  const deletePersonType = (id) => {
    useDeletePersonType(id, { setOnLoad });
  }

  const cleanForm = ( ) => {
    setPersonTypeName('');
    setPersonTypeState('');
  }

  useEffect( () => {
    setOnLoad(true)
    const urlPersonType="http://localhost:8080/personType/";
    useGetPersonType( urlPersonType, { setPersonTypes } );
  },[onLoad])

  return (
    <>
      {/* Create section */}
      <div className='personType_container'>
        <P_Head text={'Administración De Tipos de Personas'} className={'p_h1'}/>
        <P_Head text={'Crear Tipo de Persona'} className={'p_h2'}/>
        <form className={'personType_form'} onSubmit={(e) => savePersonType(e)}>
          <div>
            <Label lambdaClassLabel="" text="Tipo:"/>
            <Input lambdaClassInput="" type="text"  value={personTypeName} onChange={(e) => setPersonTypeName( e.target.value )} placeholder='Tipo de persona' required autoFocus/>
          </div>
          <div>
            <Label lambdaClassLabel="" text="Estado:"/>
            <Input lambdaClassInput="" type="checkbox" value={personTypeState} onChange={ (e) => setPersonTypeState(!personTypeState) } checked={personTypeState} />
          </div>
          <div></div>
          <div className='sendRole_button'>
            <button className='btn btn-primary' >Guardar</button>
          </div>
        </form>
        {/* Table section */}
          <P_Head text={'Lista de Tipos de persona'} className={'p_h2'}/>
        <div className='table-responsive personTypeTable_container'>
          {
            <Table_personType columns={["Id", "Nombre", "Estado"]} rows={personTypes} editData={editPersonType} deleteData={deletePersonType}/>
          }
        </div>
      </div>
      <Toaster/>
    </>
  )
}

export default CreateListPeopleType
