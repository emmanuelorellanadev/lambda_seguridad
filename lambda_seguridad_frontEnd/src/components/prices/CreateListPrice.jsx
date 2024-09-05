import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast';

import '../../css/service/service.css';
import { P_Head } from '../ui/P_Head';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { useCreatePrice } from './hooks/useCreatePrice';
import { useDeletePrice } from './hooks/useDeletePrice';
import Table_price from '../ui/tables/Table_price';

const CreateListPrice = (props) => {

  const [ price, setPrice ] = useState('');
  const [ priceState, setPriceState ] = useState(true);
  const [ onLoad, setOnLoad ] = useState(true);

  // Create Service
  const savePrice = async (e) => {
    e.preventDefault();
    const urlPrice = 'http://localhost:8080/roomPrice/';
    useCreatePrice(urlPrice, price, priceState, setOnLoad)
    cleanForm();
  }

  const editPrice = (priceId) => {
    props.navUpdatePrice( priceId );
  }
  
  const deletePrice = ( id, service ) => {
    const urlPrice = `http://localhost:8080/roomPrice/${id}`;
    useDeletePrice(urlPrice, id, service, { setOnLoad });
  }

  const cleanForm = ( ) => {
    setPrice('');
    setPriceState(true);
  }

  return (
    <>
      <div className='service_container'>
        <P_Head text={'Administración De Precios'} className={'p_h1'}/>
        <P_Head text={'Crear Precio'} className={'p_h2'}/>
        {/* Create secction */}
        <form className={'service_form'} onSubmit={e => savePrice(e)}>
          <div>
            <Label lambdaClassLabel="" text="Precio:"/>
            <Input lambdaClassInput="" type="text"  value={price} onChange={(e) => setPrice( e.target.value )} placeholder='Precio' required autoFocus/>
          </div>
          <div>
            <Label lambdaClassLabel="" text="Estado:"/>
            <Input lambdaClassInput="" type="checkbox" value={priceState} onChange={ (e) => setPriceState(!priceState) } checked={priceState} />
          </div>
          <div></div>
          <div className='sendService_button'>
            <button className='btn btn-primary' >Guardar</button>
          </div>
        </form>
        {/* Table section */}
          <P_Head text={'Lista De Precios'} className={'p_h2'}/>
        <div className='table-responsive serviceTable_container'>
          <Table_price columns={["Id", "Precio", "Estado"]} editData={editPrice} deleteData={deletePrice} setOnLoad={setOnLoad} onLoad={onLoad}/>
        </div>
      </div>
      <Toaster/>
    </>
  )
}

export default CreateListPrice
