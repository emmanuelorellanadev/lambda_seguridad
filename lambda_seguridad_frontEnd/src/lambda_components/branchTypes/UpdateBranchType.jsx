import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast';

import '../../css/branchType/branchType.css'
import { P_Head } from '../ui/P_Head';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { useGetBranchType } from './hooks/useGetBranchType';
import { useUpdateBranchType } from './hooks/useUpdateBranchType';

const UpdateBranchType = (props) => {

    const [ id, setId] = useState('');
    const [ branchTypeName, setBranchTypeName ] = useState('');
    const [ branchTypeState, setBranchTypeState ] = useState(false);

    const updateBranchType = async(e ) => {
      e.preventDefault();
      const urlBranchType = `http://localhost:8080/branchType/${props.branchTypeId}`;
      useUpdateBranchType( urlBranchType, id, branchTypeName, branchTypeState );
    }
    
    useEffect( () => {
      const urlBranchType = `http://localhost:8080/branchType/${props.branchTypeId}`;
      useGetBranchType(urlBranchType, {setId, setBranchTypeName, setBranchTypeState})
    }, [])

  return (
    <>
    <div className='branchType_container'>
      <P_Head text={'Administración De Tipos de Sucursal'} className={'p_h1'}/>
      <P_Head text={'Actualizar Tipo de Sucursal'} className={'p_h2'}/>
        <form className='branchType_form' onSubmit={e => updateBranchType(e)}>
          <div>
            <Label lambdaClassLabel={""} text="Id:"/>
            <Input lambdaClassInput={""} type="number" name="id" value={id}  onChange={ e => setId(e.target.value)} required autoFocus/>
          </div>
          <div>
            <Label lambdaClassLabel={""} text="Nombre:"/>
            <Input lambdaClassInput={""} type="text" name="role_name" value={branchTypeName || ''} onChange={ e => setBranchTypeName(e.target.value)} required/>
          </div>
          <div>
            <Label lambdaClassLabel={""} text="Estado:"/>
            <Input lambdaClassInput={""} type="checkbox" name="role_state" value={ branchTypeState || '' } onChange={ e => setBranchTypeState( !branchTypeState ) } checked={branchTypeState} />
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
