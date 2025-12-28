import React, { useContext, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast';

import '../../css/service/service.css'
import { P_Head } from '../ui/P_Head';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { useGetPrice } from './hooks/useGetPrice';
import { useUpdatePrice } from './hooks/useUpdatePrice';
import { GlobalContext } from '../../context/GlobalContext';

const UpdatePrice = (props) => {

    const { urlLambda } = useContext(GlobalContext);
    const [ id, setId] = useState('');
    const [ price, setPrice ] = useState('');
    const [ priceState, setPriceState ] = useState(false);

    const updatePrice = async(e ) => {
      e.preventDefault();
      const urlPrice = `${urlLambda}/roomPrice/${props.priceId}`;
      useUpdatePrice( urlPrice, id, price, priceState );
    }
    
    useEffect( () => {
      const urlPrice = `${urlLambda}/roomPrice/${props.priceId}`;
      useGetPrice(urlPrice, {setId, setPrice, setPriceState});
    }, [])

  return (
    <>
    <div className='service_container'>
      <P_Head text={'Administración De Precios'} className={'p_h1'}/>
      <P_Head text={'Actualizar Precio'} className={'p_h2'}/>
        <form className='service_form' onSubmit={e => updatePrice(e)}>
          <div>
            <Label lambdaClassLabel={""} text="Id:"/>
            <Input lambdaClassInput={""} type="number" name="id" value={id}  onChange={ e => setId(e.target.value)} required autoFocus/>
          </div>
          <div>
            <Label lambdaClassLabel={""} text="Precio:"/>
            <Input lambdaClassInput={""} type="number" name="price" value={price || ''} onChange={ e => setPrice(e.target.value)} required/>
          </div>
          <div>
            <Label lambdaClassLabel={""} text="Estado:"/>
            <Input lambdaClassInput={""} type="checkbox" name="priceState" value={ priceState || '' } onChange={ e => setPriceState( !priceState ) } checked={priceState} />
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

export default UpdatePrice
