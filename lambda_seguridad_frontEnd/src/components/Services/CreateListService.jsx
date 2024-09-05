import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast';

import '../../css/service/service.css';
import { P_Head } from '../ui/P_Head';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import Table_service from '../ui/tables/Table_Service';
import { useCreateService } from './hooks/useCreateService';
import { useDeleteService } from './hooks/useDeleteService';

const CreateListService = (props) => {

  const [ serviceName, setServiceName ] = useState('');
  const [ serviceState, setServiceState ] = useState(true);
  const [ onLoad, setOnLoad ] = useState(true);

  // Create Service
  const saveService = async (e) => {
    e.preventDefault();
    const urlService = 'http://localhost:8080/service/';
    useCreateService(urlService, serviceName, serviceState, setOnLoad)
    cleanForm();
  }

  const editService = (serviceId) => {
    props.navUpdateService( serviceId );
  }
  
  const deleteService = ( id, service ) => {
    const urlService = `http://localhost:8080/service/${id}`;
    useDeleteService(urlService, id, service, { setOnLoad });
  }

  const cleanForm = ( ) => {
    setServiceName('');
    setServiceState(true);
  }

  return (
    <>
      <div className='service_container'>
        <P_Head text={'Administración De Servicios'} className={'p_h1'}/>
        <P_Head text={'Crear Servicio'} className={'p_h2'}/>
        {/* Create secction */}
        <form className={'service_form'} onSubmit={e => saveService(e)}>
          <div>
            <Label lambdaClassLabel="" text="Servicio:"/>
            <Input lambdaClassInput="" type="text"  value={serviceName} onChange={(e) => setServiceName( e.target.value )} placeholder='Servicio' required autoFocus/>
          </div>
          <div>
            <Label lambdaClassLabel="" text="Estado:"/>
            <Input lambdaClassInput="" type="checkbox" value={serviceState} onChange={ (e) => setServiceState(!serviceState) } checked={serviceState} />
          </div>
          <div></div>
          <div className='sendService_button'>
            <button className='btn btn-primary' >Guardar</button>
          </div>
        </form>
        {/* Table section */}
          <P_Head text={'Lista De Servicios'} className={'p_h2'}/>
        <div className='table-responsive serviceTable_container'>
          <Table_service columns={["Id", "Servicio", "Estado"]} editData={editService} deleteData={deleteService} setOnLoad={setOnLoad} onLoad={onLoad}/>
        </div>
      </div>
      <Toaster/>
    </>
  )
}

export default CreateListService
