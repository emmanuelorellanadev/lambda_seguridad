import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast';

import '../../css/branchType/branchType.css';
import { useCreateBranchType } from './hooks/useCreateBranchType';
import { P_Head } from '../ui/P_Head'; 
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import Table_branchType from '../ui/tables/Table_branchType';
import { useDeleteBranchType } from './hooks/useDeleteBranchType';

const CreateListRoles = (props) => {

  const [ branchTypeName, setBranchTypeName ] = useState('');
  const [ branchTypeState, setBranchTypeState ] = useState(true);
  const [ branchTypes, setBranchTypes ] = useState([]);
  const [ onLoad, setOnLoad ] = useState(true);

  //Create BranchType
  const saveBranchType = async (e) => {
    e.preventDefault();
    const urlBranchType = 'http://localhost:8080/branchType/';
    useCreateBranchType(urlBranchType, branchTypeName, branchTypeState, setOnLoad)
    cleanForm();
  }

  const editBranchType = (branchTypeId) => {
    props.navUpdateBranchType( branchTypeId );
  }
  
  const deleteRole = ( id, branchType ) => {
    const urlBranchType = `http://localhost:8080/branchType/${id}`;
    useDeleteBranchType(urlBranchType, id, branchType, setOnLoad);
  }

  const cleanForm = ( ) => {
    setBranchTypeName('');
    setBranchTypeState(true);
  }

  return (
    <>
      <div className='branchType_container'>
        <P_Head text={'Administración De Tipos de Sucursal'} className={'p_h1'}/>
        <P_Head text={'Crear Tipo de Sucursal'} className={'p_h2'}/>
        {/* Create secction */}
        <form className={'branchType_form'} onSubmit={e => saveBranchType(e)}>
          <div>
            <Label lambdaClassLabel="" text="Tipo de Sucursal:"/>
            <Input lambdaClassInput="" type="text"  value={branchTypeName} onChange={(e) => setBranchTypeName( e.target.value )} placeholder='Tipo de Sucursal' required autoFocus/>
          </div>
          <div>
            <Label lambdaClassLabel="" text="Estado:"/>
            <Input lambdaClassInput="" type="checkbox" value={branchTypeState} onChange={ (e) => setBranchTypeState(!branchTypeState) } checked={branchTypeState} />
          </div>
          <div></div>
          <div className='sendBranchType_button'>
            <button className='btn btn-primary' >Guardar</button>
          </div>
        </form>
        {/* Table section */}
          <P_Head text={'Lista de Tipos de Sucursal'} className={'p_h2'}/>
        <div className='table-responsive branchTypeTable_container'>
          <Table_branchType columns={["Id", "Nombre", "Estado"]} editData={editBranchType} deleteData={deleteRole} setOnLoad={setOnLoad} onLoad={onLoad}/>
        </div>
      </div>
      <Toaster/>
    </>
  )
}

export default CreateListRoles
