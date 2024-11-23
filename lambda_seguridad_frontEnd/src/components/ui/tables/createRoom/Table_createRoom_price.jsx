import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import '../../../../css/ui/table.css'
import { Label } from '../../Label';
import { Select } from '../../Select';
import { useGetPrice } from '../../../prices/hooks/useGetPrice'

export const Table_createRoom_price = ({ columns, deleteData, onLoad, setOnLoad, roomData, dispatch, ...props}) => {

  const [ prices, setPrices ] = useState([]);
  const [ pricesSelected, setPricesSelected ] = useState([]);

  const [ prevPage, setPrevPage ] = useState('');
  const [ nextPage, setNextPage ] = useState('');

  // const [ onLoad, setOnLoad ] = useState(false);

  if(!columns.includes("Eliminar") ){
    columns.push("Eliminar")
}

const getPrices = async() => {
  const urlPrice = `http://localhost:8080/roomPrice/`;
  await useGetPrice(urlPrice, {setPrices, setNextPage, setPrevPage});
}

const selectPrice = (priceId) => {

  prices?.data.map( price => {
    let inList = false
    if ( roomData.prices.length <= 0 ){
    if (price.id == priceId) {
      roomData.prices.push(JSON.parse(JSON.stringify(price)))
    }
    }else {
      roomData.prices?.map( priceInList => {
        if (priceInList.id == priceId) inList = true;
      } )
      if( !inList ){
        price.id == priceId ? roomData.prices.push(JSON.parse(JSON.stringify(price))) : ''
        setOnLoad(true);
      }else{
        if (price.id == priceId) {
          toast.success(`El precio ya se encuentra en la lista`, {
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

const deletePrice = (id, price) => {
  const index = roomData.prices.map(price => price.id).indexOf(id);
  roomData.prices.splice(index, 1)
  setOnLoad(true);
}

useEffect( () => {
  setOnLoad(false);
  getPrices();
}, [onLoad])

  return (
    <>
    {/* <div className='room_priceTable_container'> */}

      <div>
          <Select data={prices?.data} text="Selecciona nuevo Precio" value={0} onChange={ (e) => {selectPrice(e.target.value)}} required />
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
              roomData.prices?.map( ( price ) => {
                return (
                  <tr key={price.id}>
                    <th>{`Q. ${price.room_price}.00`}</th>
                    <th><button className='btn btn-outline-danger' onClick={ () => deletePrice(price.id, price.room_price) }><i className='bi bi-trash3-fill'></i></button></th>
                  </tr>
                )
              })
            }
          </tbody>
      </table>
    {/* </div> */}

  </>
  )
}

export default Table_createRoom_price