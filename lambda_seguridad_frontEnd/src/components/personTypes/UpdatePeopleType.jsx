import React, { useEffect, useReducer, useContext } from 'react'

import '../../css/personType/personType.css';
import { P_Head } from '../ui/P_Head';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { useGetPersonType } from './hooks/useGetPersonType';
import useUpdatePeopleType from './hooks/useUpdatePeopleType';
import { Toaster } from 'react-hot-toast';
import { GlobalContext } from '../../context/GlobalContext';
import { initialPersonTypeState, personTypeReducer } from './reducer/PersonTypesReducer';

export const UpdatePeopleType = (props) => {

  const { urlLambda, token } = useContext(GlobalContext);
  const [personTypeState, personTypeDispatch] = useReducer(personTypeReducer, initialPersonTypeState);

  const urlPersonType = `${urlLambda}/personType/${props.id}`;

  const updatePersonType = (e) => {
    e.preventDefault();
    useUpdatePeopleType(urlPersonType, token, personTypeState.id, personTypeState.personTypeName, personTypeState.personTypeState);
  }
  
  useEffect(() => {
    useGetPersonType(urlPersonType, token, undefined, personTypeDispatch);
  }, [urlPersonType, token]);

  return (
    <>
      <div className='personType_container'>
        <P_Head text={'Administración De Tipos de Personas'} className={'p_h1'}/>
        <P_Head text={'Actualizar Tipo de Persona'} className={'p_h2'}/>
        <form className={'personType_form'} onSubmit={(e) => updatePersonType(e)}>
          <div>
            <Label lambdaClassLabel="" text="Id:"/>
            <Input lambdaClassInput="" type="number"  value={personTypeState.id} onChange={(e) => personTypeDispatch({ type: 'SET_FIELD', field: 'id', value: e.target.value })} placeholder='Id' required autoFocus/>
          </div>
          <div>
            <Label lambdaClassLabel="" text="Tipo:"/>
            <Input lambdaClassInput="" type="text"  value={personTypeState.personTypeName || ''} onChange={(e) => personTypeDispatch({ type: 'SET_FIELD', field: 'personTypeName', value: e.target.value })} placeholder='Tipo de persona' required/>
          </div>
          <div>
            <Label lambdaClassLabel="" text="Estado:"/>
            <Input lambdaClassInput="" type="checkbox" value={personTypeState.personTypeState || ''} onChange={ () => personTypeDispatch({ type: 'SET_FIELD', field: 'personTypeState', value: !personTypeState.personTypeState }) } checked={personTypeState.personTypeState} />
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
