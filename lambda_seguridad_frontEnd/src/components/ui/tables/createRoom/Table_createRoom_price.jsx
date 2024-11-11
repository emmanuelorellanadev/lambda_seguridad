import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import '../../../../css/ui/table.css'
import { Label } from '../../Label';
import { Select } from '../../Select';
import { useGetPrice } from '../../../prices/hooks/useGetPrice'

export const Table_createRoom_price = ({ columns, deleteData, dispatch, ...props}) => {

  const [ prices, setPrices ] = useState([]);
  const [ pricesSelected, setPricesSelected ] = useState([]);

  const [ prevPage, setPrevPage ] = useState('');
  const [ nextPage, setNextPage ] = useState('');

  const [ onLoad, setOnLoad ] = useState(false);

  if(deleteData && !columns.includes("Eliminar") ){
    columns.push("Eliminar")
}

const getPrices = async() => {
  const urlPrice = `http://localhost:8080/roomPrice/`;
  await useGetPrice(urlPrice, {setPrices, setNextPage, setPrevPage});
}

const selectPrice = (priceId) => {

  prices?.data.map( price => {
    let inList = false
    if ( pricesSelected.length <= 0 ){
    if (price.id == priceId) {
      pricesSelected.push(JSON.parse(JSON.stringify(price)))
    }
    }else {
      pricesSelected.map( priceInList => {
        if (priceInList.id == priceId) inList = true;
      } )
      if( !inList ){
        price.id == priceId ? pricesSelected.push(JSON.parse(JSON.stringify(price))) : ''
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

  setOnLoad(false)
}

const getIdOfPrices = () => {
  const idPrices = [];
  pricesSelected?.map( priceSelected => {
    idPrices.push(priceSelected.id)
  })
  dispatch({type: 'UPDATE_PRICES', prices: idPrices })
}

const deletePrice = (id, price) => {
  const index = pricesSelected.map(price => price.id).indexOf(id);
  pricesSelected.splice(index, 1)
  setOnLoad(false);
}

useEffect( () => {
  setOnLoad(true)
  getPrices()
  getIdOfPrices();
}, [onLoad])

  return (
    <>
      <div>
          <Label lambdaClassLabel={""} text="Precios:"/>
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
            pricesSelected.map( ( price ) => {
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
  </>
  )
}

export default Table_createRoom_price