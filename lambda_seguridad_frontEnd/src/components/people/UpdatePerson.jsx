import React, { useEffect, useState } from 'react'

import '../../css/person/person.css'
import { P_Head } from '../ui/P_Head';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Select } from '../ui/Select';
import useGetPersonType from '../personTypes/hooks/useGetPersonType';
import { useGetBranch } from '../branches/hooks/useGetBranch';
import { useGetPerson } from './hooks/useGetPerson';
import { useUpdatePerson } from './hooks/useUpdatePerson';
import { Toaster } from 'react-hot-toast';

const UpdatePerson = (props) => {

  const urlPerson = `http://localhost:8080/person/${props.personId}`;
  const [names, setNames] =useState('');
  const [surNames, setSurNames] =useState('');
  const [cui, setCui] =useState('');
  const [nit, setNit] =useState('');
  const [phone, setPhone] =useState('');
  const [address, setAddress] =useState('');
  const [branchId, setBranchId] =useState('');
  const [personTypeId, setPersonTypeId] =useState('');
  const [personTypes, setPersonTypes] =useState([]);
  const [branches, setBranches] =useState([]);
  const [nextPage, setNextPage ] = useState('');
  const [prevPage, setPrevPage ] = useState('');
  
  const updatePerson = async(e) => {
    e.preventDefault();
    useUpdatePerson(urlPerson, names, surNames, cui, nit, phone, address, personTypeId, branchId)
  }

  useEffect( () => {
    const urlPersonType = 'http://localhost:8080/personType/';
    const urlBranch = 'http://localhost:8080/branch/';
    useGetPerson(urlPerson, {setNames, setSurNames, setCui, setNit, setPhone, setAddress, setPersonTypeId, setBranchId });
    useGetPersonType(urlPersonType, { setPersonTypes, setNextPage, setPrevPage });
    useGetBranch(urlBranch, { setBranches, setNextPage, setPrevPage });
  },[])

  return (
    <>
    <div className='person_container'>
        <P_Head text={'Actualizar Persona'} className={'p_h1'}/>
        <form className='person_form' onSubmit={updatePerson}>
            <div>
              <Label lambdaClassLabel={""} text="Nombres:"/>
              <Input lambdaClassInput=""  type='text' value={names} onChange={(e) => setNames(e.target.value)} placeholder={'Nombres'} required/>
            </div>
            <div>
              <Label lambdaClassLabel={""} text="Apellidos"/>
              <Input lambdaClassInput="" type='text' value={surNames} onChange={(e) => setSurNames(e.target.value)} placeholder={'Apellidos'} required/>
            </div>
            <div>
              <Label lambdaClassLabel={""} text="CUI"/>
              <Input  lambdaClassInput="" type='number' value={cui} onChange={(e) => setCui(e.target.value)} placeholder={'CUI'} />
            </div>
            <div>
              <Label lambdaClassLabel={""} text="NIT"/>
              <Input lambdaClassInput="" type='number' value={nit} onChange={(e) => setNit(e.target.value)} placeholder={'NIT'} />
            </div>
            <div>
              <Label lambdaClassLabel={""} text="Teléfono"/>
              <Input lambdaClassInput="" type='number' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={'Teléfono'} />
            </div>
            <div>
              <Label lambdaClassLabel={""} text="Dirección"/>
              <Input lambdaClassInput="" type='text' value={address} onChange={(e) => setAddress(e.target.value)} placeholder={'Dirección'} />
            </div>
            <div>
              <Label lambdaClassLabel={""} text="Tipo"/>
              <Select data={personTypes.data} text={'Selecciona Tipo'} value={personTypeId} onChange={ (e) => {setPersonTypeId(e.target.value)}} required />
              </div>            
              <div>
              <Label lambdaClassLabel={""} text="Sucursal"/>
                <Select data={branches.data} text={'Selecciona Sucursal'} value={branchId} onChange={ (e) => {setBranchId(e.target.value)}} required />
              </div>
              <div className='sendPerson_button'>
                <button className='btn btn-primary'>Actualizar</button>
              </div>
        </form>
    </div>
    <Toaster/>
    </>
  )
}

export default UpdatePerson
