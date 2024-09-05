import React, { useState } from 'react'

import CreateListPrice from './CreateListPrice';
import UpdatePrice from './UpdatePrice';

const SubMenuPrice = () => {

  const [ createListPrice, setCreateListPrice ] = useState(1);
  const [ updatePrice, setUpdatePrice ] = useState(0);
  const [ priceId, setPriceId] = useState('');
  
  const navCreateListPrice = () => {
      setCreateListPrice(1);
      setUpdatePrice(0);
  }

  const navUpdatePrice = (priceId) => {
      setCreateListPrice(0);
      setUpdatePrice(1);
      setPriceId(priceId);
  }

  return (
      <>
      <h1></h1>
      <div className='subMenu'>
        <ul>
          <li onClick={navCreateListPrice}>Crear y Listar</li>
        </ul>
      </div>
        { createListPrice === 1 && <CreateListPrice navUpdatePrice={navUpdatePrice} />}
        { updatePrice === 1 && <UpdatePrice  priceId={priceId}/>}
      </>
  )

}

export default SubMenuPrice