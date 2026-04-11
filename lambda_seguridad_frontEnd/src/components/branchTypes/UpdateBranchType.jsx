import '../../css/ui/headings.css'; //hadle p_h1, p_h2, p_h3
import React, { useEffect, useReducer, useContext } from 'react'
import { Toaster } from 'react-hot-toast';

import '../../css/branchType/branchType.css'
import { P_Head } from '../ui/P_Head';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { useGetBranchType } from './hooks/useGetBranchType';
import { useUpdateBranchType } from './hooks/useUpdateBranchType';
import { GlobalContext } from '../../context/GlobalContext';
import { initialBranchTypeState, branchTypeReducer } from './reducer/BranchTypesReducer';

const UpdateBranchType = (props) => {
  const { urlLambda, token } = useContext(GlobalContext);

    const [branchTypeState, branchTypeDispatch] = useReducer(branchTypeReducer, initialBranchTypeState);

    const updateBranchType = async(e ) => {
      e.preventDefault();
      const urlBranchType = `${urlLambda}/branchType/${props.branchTypeId}`;
      useUpdateBranchType( urlBranchType, token, branchTypeState.id, branchTypeState.branchTypeName, branchTypeState.branchTypeState );
    }
    
    useEffect( () => {
      const urlBranchType = `${urlLambda}/branchType/${props.branchTypeId}`;
      useGetBranchType(urlBranchType, token, undefined, branchTypeDispatch)
    }, [urlLambda, props.branchTypeId, token])

  return (
    <>
    <div className='branchType_container'>
      <P_Head text={'Administración De Tipos de Sucursal'} className={'p_h1'}/>
      <P_Head text={'Actualizar Tipo de Sucursal'} className={'p_h2'}/>
        <form className='branchType_form' onSubmit={e => updateBranchType(e)}>
          <div>
            <Label lambdaClassLabel={""} text="Id:"/>
            <Input lambdaClassInput={""} type="number" name="id" value={branchTypeState.id}  onChange={ e => branchTypeDispatch({ type: "SET_FIELD", field: "id", value: e.target.value })} required autoFocus/>
          </div>
          <div>
            <Label lambdaClassLabel={""} text="Nombre:"/>
            <Input lambdaClassInput={""} type="text" name="role_name" value={branchTypeState.branchTypeName || ''} onChange={ e => branchTypeDispatch({ type: "SET_FIELD", field: "branchTypeName", value: e.target.value })} required/>
          </div>
          <div>
            <Label lambdaClassLabel={""} text="Estado:"/>
            <Input lambdaClassInput={""} type="checkbox" name="role_state" value={ branchTypeState.branchTypeState || '' } onChange={ () => branchTypeDispatch({ type: "SET_FIELD", field: "branchTypeState", value: !branchTypeState.branchTypeState }) } checked={branchTypeState.branchTypeState} />
          </div>
          <div></div>
          <div className='sendBranchType_button'>
            <button className='btn btn-primary' >Actualizar</button>
          </div>
        </form>
    </div>
    <Toaster/>
    </>
  )
}

export default UpdateBranchType
