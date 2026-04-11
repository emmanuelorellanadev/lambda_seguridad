import '../../css/ui/headings.css'; //hadle p_h1, p_h2, p_h3
import React, { useReducer, useContext, useState } from 'react'
import { Toaster } from 'react-hot-toast';

import '../../css/branchType/branchType.css';
import { useCreateBranchType } from './hooks/useCreateBranchType';
import { P_Head } from '../ui/P_Head'; 
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import Table_branchType from '../ui/tables/Table_branchType';
import { useDeleteBranchType } from './hooks/useDeleteBranchType';
import { GlobalContext } from '../../context/GlobalContext';
import { initialBranchTypeState, branchTypeReducer } from './reducer/BranchTypesReducer';

const CreateListRoles = (props) => {

  const [branchTypeState, branchTypeDispatch] = useReducer(branchTypeReducer, initialBranchTypeState);
  const [ onLoad, setOnLoad ] = useState(false);
  const { urlLambda, token } = useContext(GlobalContext);

  //Create BranchType
  const saveBranchType = async (e) => {
    e.preventDefault();
    const urlBranchType = `${urlLambda}/branchType/`;
    useCreateBranchType(urlBranchType, token, branchTypeState.branchTypeName, branchTypeState.branchTypeState, setOnLoad)
    cleanForm();
  }

  const editBranchType = (branchTypeId) => {
    props.navUpdateBranchType( branchTypeId );
  }
  
  const deleteBranchType = ( id, branchType, setOnLoad ) => {
    const urlBranchType = `${urlLambda}/branchType/${id}`;
    useDeleteBranchType(urlBranchType, token, id, branchType, setOnLoad);
  }

  const cleanForm = ( ) => {
    branchTypeDispatch({ type: "RESET_BRANCH_TYPE" });
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
            <Input lambdaClassInput="" type="text"  value={branchTypeState.branchTypeName} onChange={(e) => branchTypeDispatch({ type: "SET_FIELD", field: "branchTypeName", value: e.target.value })} placeholder='Tipo de Sucursal' required autoFocus/>
          </div>
          <div>
            <Label lambdaClassLabel="" text="Estado:"/>
            <Input lambdaClassInput="" type="checkbox" value={branchTypeState.branchTypeState} onChange={ () => branchTypeDispatch({ type: "SET_FIELD", field: "branchTypeState", value: !branchTypeState.branchTypeState }) } checked={branchTypeState.branchTypeState} />
          </div>
          <div></div>
          <div className='sendBranchType_button'>
            <button className='btn btn-primary' >Guardar</button>
          </div>
        </form>
        {/* Table section */}
          <P_Head text={'Lista de Tipos de Sucursal'} className={'p_h2'}/>
        <div className='table-responsive branchTypeTable_container'>
          <Table_branchType columns={["Id", "Nombre", "Estado"]} editData={editBranchType} deleteData={deleteBranchType} onLoad={onLoad} setOnLoad={setOnLoad}  />
        </div>
      </div>
      <Toaster/>
    </>
  )
}

export default CreateListRoles
