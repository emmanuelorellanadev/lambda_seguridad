import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast';

import '../../css/service/service.css'
import { P_Head } from '../ui/P_Head';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { useGetService } from './hooks/useGetService';
import { useUpdateService } from './hooks/useUpdateService';

const UpdateService = (props) => {

    const [ id, setId] = useState('');
    const [ serviceName, setServiceName ] = useState('');
    const [ serviceState, setServiceState ] = useState(false);

    const updateService = async(e ) => {
      e.preventDefault();
      const urlService = `http://localhost:8080/service/${props.serviceId}`;
      useUpdateService( urlService, id, serviceName, serviceState );
    }
    
    useEffect( () => {
      const urlService = `http://localhost:8080/service/${props.serviceId}`;
      useGetService(urlService, {setId, setServiceName, setServiceState});
    }, [])

  return (
    <>
    <div className='service_container'>
      <P_Head text={'Administración De Servicios'} className={'p_h1'}/>
      <P_Head text={'Actualizar Servicio'} className={'p_h2'}/>
        <form className='service_form' onSubmit={e => updateService(e)}>
          <div>
            <Label lambdaClassLabel={""} text="Id:"/>
            <Input lambdaClassInput={""} type="number" name="id" value={id}  onChange={ e => setId(e.target.value)} required autoFocus/>
          </div>
          <div>
            <Label lambdaClassLabel={""} text="Nombre:"/>
            <Input lambdaClassInput={""} type="text" name="role_name" value={serviceName || ''} onChange={ e => setServiceName(e.target.value)} required/>
          </div>
          <div>
            <Label lambdaClassLabel={""} text="Estado:"/>
            <Input lambdaClassInput={""} type="checkbox" name="role_state" value={ serviceState || '' } onChange={ e => setServiceState( !serviceState ) } checked={serviceState} />
          </div>
          <div></div>
          <div className='sendService_button'>
            <button className='btn btn-primary' >Actualizar</button>
          </div>
        </form>
    </div>
    <Toaster/>
    </>
  )
}

export default UpdateService
