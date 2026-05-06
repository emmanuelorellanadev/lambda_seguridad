import { useReducer, useState, useContext } from 'react'

import '../../css/personType/personType.css'
import { P_Head } from '../ui/P_Head';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';

import useCreatePersonType from './hooks/useCreatePersonType';
import Table_personType from '../ui/tables/Table_personType';
import useDeletePersonType from './hooks/useDeletePersonType';
import { Toaster } from 'react-hot-toast';
import { GlobalContext } from '../../context/GlobalContext';
import { initialPersonTypeState, personTypeReducer } from './reducer/PersonTypesReducer';

export const CreateListPeopleType = (props) => {
  
  const [personTypeState, personTypeDispatch] = useReducer(personTypeReducer, initialPersonTypeState);
  const [onLoad, setOnLoad] = useState(false);
  const { urlLambda, token } = useContext(GlobalContext);

  
  const savePersonType = (e) => {
    e.preventDefault();
    const urlPersonType = `${urlLambda}/personType/`;
    useCreatePersonType(urlPersonType, token, personTypeState.personTypeName, personTypeState.personTypeState, { setOnLoad });
    cleanForm();
  }

  const editPersonType = (id) => {
    props.navEditPersonType(id)
  }

  const deletePersonType = (id, personType, setOnLoad) => {
    const urlPersonType = `${urlLambda}/personType/${id}`;
    useDeletePersonType(urlPersonType, token, { setOnLoad });
  }

  const cleanForm = ( ) => {
    personTypeDispatch({ type: 'RESET_PERSON_TYPE' });
  }

  return (
    <>
      {/* Create section */}
      <div className='personType_container'>
        <P_Head text={'Administración De Tipos de Personas'} className={'p_h1'}/>
        <P_Head text={'Crear Tipo de Persona'} className={'p_h2'}/>
        <form className={'personType_form'} onSubmit={(e) => savePersonType(e)}>
          <div>
            <Label lambdaClassLabel="" text="Tipo:"/>
            <Input lambdaClassInput="" type="text"  value={personTypeState.personTypeName} onChange={(e) => personTypeDispatch({ type: 'SET_FIELD', field: 'personTypeName', value: e.target.value })} placeholder='Tipo de persona' required autoFocus/>
          </div>
          <div>
            <Label lambdaClassLabel="" text="Estado:"/>
            <Input lambdaClassInput="" type="checkbox" value={personTypeState.personTypeState} onChange={() => personTypeDispatch({ type: 'SET_FIELD', field: 'personTypeState', value: !personTypeState.personTypeState })} checked={personTypeState.personTypeState} />
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
            <Table_personType columns={["Id", "Nombre", "Estado"]} editData={editPersonType} deleteData={deletePersonType} onLoad={onLoad} setOnLoad={setOnLoad} />
          }
        </div>
      </div>
      <Toaster/>
    </>
  )
}

export default CreateListPeopleType
