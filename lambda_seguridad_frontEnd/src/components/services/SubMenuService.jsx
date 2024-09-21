import React, { useReducer, useState } from 'react'

import CreateListService from './CreateListService';
import UpdateService from './UpdateService';

function menuServiceReducer (state, action) {
  switch (action.type){
    case 'CREATELIST_SERVICE':
      return {createListService: true, updateService: false}
    case 'UPDATE_SERVICE':
      return {createListService: false, updateService: true}
    default:
      return state
  } 
}

const SubMenuService = () => {
  const initialState = { createListService: true, updateService: false}
  const [ menuServiceState, menuServiceDispatch ] = useReducer( menuServiceReducer, initialState )
  const [ serviceId, setServiceId] = useState('');

  const navCreateListService = () => {
      menuServiceDispatch({type: 'CREATELIST_SERVICE'})
  }

  const navUpdateService = (serviceId) => {
      setServiceId(serviceId);
      menuServiceDispatch({type: 'UPDATE_SERVICE'})
  }

  return (
      <>
      <h1></h1>
      <div className='subMenu'>
        <ul>
          <li onClick={navCreateListService}>Crear y Listar</li>
        </ul>
      </div>
        { menuServiceState.createListService === true && <CreateListService navUpdateService={navUpdateService} />}
        { menuServiceState.updateService === true && <UpdateService  serviceId={serviceId}/>}
      </>
  )
}

export default SubMenuService