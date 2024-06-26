import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import '../../css/person/person.css';
import { useCreatePerson } from './hooks/useCreatePerson';
import useGetPersonType  from '../personTypes/hooks/useGetPersonType';
import { useGetBranch } from '../branches/hooks/useGetBranch';
import { P_Head } from '../ui/P_Head';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Select } from '../ui/Select';

const CreatePerson = () => {
  
    const [personTypes, setPersonTypes] = useState([]);
    const [branches, setBranches] = useState([]);
    const [names, setNames] = useState('');
    const [surNames, setSurNames] = useState('');
    const [cui, setCui] = useState('');
    const [nit, setNit] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [personTypeId, setPersonTypeId] = useState('');
    const [branchId, setBranchId] = useState('');

    const savePerson = async(e) => {
        e.preventDefault();
        const urlPerson = 'http://localhost:8080/person/'
        useCreatePerson(urlPerson, names, surNames, cui, nit, phone, address, personTypeId, branchId);
        cleanForm()
    }
         
    const cleanForm = () => {
        setNames('');
        setSurNames('');
        setCui('');
        setNit('');
        setPhone('');
        setAddress('');
        setPersonTypeId('');
        setBranchId('');
    }

    useEffect( () => {
        const urlPersonType = "http://localhost:8080/personType/";
        const urlBranch = "http://localhost:8080/branch/";
        useGetPersonType( urlPersonType, { setPersonTypes } );
        useGetBranch(urlBranch, {setBranches})
    }, [])

    return (
    <>
    <div className='person_container'>
        <P_Head text={'Crear Persona'} className={'p_h1'}/>
        <form className='person_form' onSubmit={e => savePerson(e)}>
            <div>
                <Label lambdaClassLabel={''} text="Nombres:"/>
                <Input type="text" lambdaClassInput={""} value={names}  onChange={(e) => setNames(e.target.value)} placeholder={'Nombres'} required/>
            </div>
            <div>
                <Label lambdaClassLabel={''} text="Apellidos:"/>
                <Input  type='text' lambdaClassInput={""} value={surNames} onChange={(e) => setSurNames(e.target.value)} placeholder={'Apellidos'} required/>
            </div>
            <div>
                <Label lambdaClassLabel={''} text="CUI:"/>
                <Input type='number' lambdaClassInput={""} value={cui} onChange={(e) => setCui(e.target.value)} placeholder={'CUI'} />
            </div>
            <div>
                <Label lambdaClassLabel={''} text="NIT:"/>
                <Input type='number' lambdaClassInput={""} value={nit} onChange={(e) => setNit(e.target.value)} placeholder={'NIT'} />
            </div>
            <div>
                <Label lambdaClassLabel={''} text="Teléfono:"/>
                <Input type='number' lambdaClassInput={""} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={'Teléfono'} />
            </div>
            <div>
                <Label lambdaClassLabel={''} text="Dirección:"/>
                <Input type='text' lambdaClassInput={""} value={address} onChange={(e) => setAddress(e.target.value)} placeholder={'Dirección'} />
            </div>
            <div>
                <Label lambdaClassLabel={''} text="Tipo:"/>
                <Select data={personTypes} text={'Selecciona Tipo' } value={personTypeId} onChange={ (e) => {setPersonTypeId(e.target.value)}} required/>
            </div>
            <div>
                <Label lambdaClassLabel={''} text="Sucursal:"/>
                <Select data={branches} text={'Selecciona Sucursal' } value={branchId} onChange={ (e) => {setBranchId(e.target.value)}} required/>
            </div>
            <div className='sendPerson_button'>
                <button className='btn btn-primary'>Guardar</button>
            </div>
        </form>
    </div>
    <Toaster/>
    </>
  )
}

export default CreatePerson