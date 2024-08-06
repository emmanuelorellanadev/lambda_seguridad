import React, {useEffect, useState} from 'react'

import '../../css/personType/personType.css';
import { P_Head } from '../ui/P_Head';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import useGetPersonType from './hooks/useGetPersonType';
import useUpdatePeopleType from './hooks/useUpdatePeopleType';
import { Toaster } from 'react-hot-toast';

export const UpdatePeopleType = (props) => {

  const [id, setId] = useState('');
  const [personTypeName, setPersonTypeName] = useState('');
  const [personTypeState, setPersonTypeState] = useState('');

  const urlPersonType = `http://localhost:8080/personType/${props.id}`;

  const updatePersonType = (e) => {
    e.preventDefault();
    useUpdatePeopleType(urlPersonType, id, personTypeName, personTypeState);
    console.log(personTypeState)
  }
  
useEffect( () => {
  useGetPersonType(urlPersonType, { setId, setPersonTypeName, setPersonTypeState });
}, [])

  return (
    <>
      <div className='personType_container'>
        <P_Head text={'Administración De Tipos de Personas'} className={'p_h1'}/>
        <P_Head text={'Actualizar Tipo de Persona'} className={'p_h2'}/>
        <form className={'personType_form'} onSubmit={(e) => updatePersonType(e)}>
          <div>
            <Label lambdaClassLabel="" text="Id:"/>
            <Input lambdaClassInput="" type="number"  value={id} onChange={(e) =>setId( e.target.value )} placeholder='Id' required autoFocus/>
          </div>
          <div>
            <Label lambdaClassLabel="" text="Tipo:"/>
            <Input lambdaClassInput="" type="text"  value={personTypeName} onChange={(e) => setPersonTypeName( e.target.value )} placeholder='Tipo de persona' required/>
          </div>
          <div>
            <Label lambdaClassLabel="" text="Estado:"/>
            <Input lambdaClassInput="" type="checkbox" value={personTypeState} onChange={ (e) => setPersonTypeState(!personTypeState) } checked={personTypeState} />
          </div>
          <div></div>
          <div className='sendRole_button'>
            <button className='btn btn-primary' >Actualizar</button>
          </div>
        </form>
      </div>
      <Toaster/>
    </>
  )
}

export default UpdatePeopleType
