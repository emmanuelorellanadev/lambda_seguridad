import React, { useState } from 'react'

import CreateListService from './CreateListService';
import UpdateService from './UpdateService';

const SubMenuService = () => {

  const [ createListService, setCreateListService ] = useState(1);
  const [ updateService, setUpdateService ] = useState(0);
  const [ serviceId, setServiceId] =useState('');
  
  const navCreateListService = () => {
      setCreateListService(1);
      setUpdateService(0);
  }

  const navUpdateService = (serviceId) => {
      setCreateListService(0);
      setUpdateService(1);
      setServiceId(serviceId);
  }

  return (
      <>
      <h1></h1>
      <div className='subMenu'>
        <ul>
          <li onClick={navCreateListService}>Crear y Listar</li>
        </ul>
      </div>
        { createListService === 1 && <CreateListService navUpdateService={navUpdateService} />}
        { updateService === 1 && <UpdateService  serviceId={serviceId}/>}
      </>
  )

}

export default SubMenuService