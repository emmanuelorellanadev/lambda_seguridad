import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import '../../../../css/ui/table.css'
import { Label } from '../../Label';
import { Select } from '../../Select';
import { useGetService } from '../../../services/hooks/useGetService'

export const Table_createRoom_service = ({ columns, deleteData, onLoad, setOnLoad, roomData, dispatch, ...props}) => {

  const [ services, setServices ] = useState([]);

  const [ prevPage, setPrevPage ] = useState('');
  const [ nextPage, setNextPage ] = useState('');

  // const [ onLoad, setOnLoad ] = useState(false);

  if(!columns.includes("Eliminar") ){
    columns.push("Eliminar")
}

const getServices = async() => {
  const urlService = `http://localhost:8080/service/`;
  await useGetService(urlService, {setServices, setNextPage, setPrevPage});
}

const selectService = (serviceId) => {

  services?.data.map( service => {
    let inList = false
    if ( roomData.services.length <= 0 ){
    if (service.id == serviceId) {
      roomData.services.push(JSON.parse(JSON.stringify(service)))
    }
    }else {
      roomData.services.map( serviceInList => {
        if (serviceInList.id == serviceId) inList = true;
      } )
      if( !inList ){
        service.id == serviceId ? roomData.services.push(JSON.parse(JSON.stringify(service))) : ''
        setOnLoad(true);
      }else{
        if (service.id == serviceId) {
          toast.success(`El servicio ya se encuentra en la lista`, {
            duration: 3000,
            position: "top-right",
            style: {
                background: "rgb(33, 157, 192)",
                color: "#fff",
                height: "4rem"
            }  
          })
        }
      }
    }
  })

  setOnLoad(true)
}

const deletePrice = (id, service) => {
  const index = roomData.services.map(service => service.id).indexOf(id);
  roomData.services.splice(index, 1)
  setOnLoad(true);
}

useEffect( () => {
  setOnLoad(false)
  getServices()
}, [onLoad])

  return (
    <>
      <div>
          <Select data={services?.data} text="Selecciona nuevo Servicio" value={0} onChange={ (e) => {selectService(e.target.value)}} required />
      </div>
      <table className='table table-bordered table-hover table-striped' {...props}>
        <thead className='text-center t_header'>
          <tr key={0}>  
            {
              columns?.map( (column) => {
                return (
                    <th key={column}>{column}</th>
                )
              })
            }
            </tr>
        </thead>
        <tbody className='text-center align-baseline'>
          {
            roomData.services?.map( ( service ) => {
              return (
                <tr key={service.id}>
                  <th>{`${service.service_name}`}</th>
                  <th><button className='btn btn-outline-danger' onClick={ () => deletePrice(service.id, service.service_name) }><i className='bi bi-trash3-fill'></i></button></th>
                </tr>
              )
            })
          }
        </tbody>
    </table>
  </>
  )
}

export default Table_createRoom_service