import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '../../css/person/person.css';
import { P_Head } from '../ui/P_Head';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Select } from '../ui/Select';
import Swal from 'sweetalert2';

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
        const url = 'http://localhost:8080/person'

        await axios.post(url, {
            "person_names": names,
            "person_surnames": surNames,
            "person_cui": cui,
            "person_nit": nit,
            "person_phone": phone,
            "person_address": address,
            "PersonTypeId": personTypeId,
            "BranchId": branchId
            }, {headers: {"x-token": sessionStorage.getItem('token-xL')}})
            .then(resp => {
                Swal.fire({
                    icon: 'success',
                    title: `Registro guardado correctamente`,
                    timer: 3000,
                    confirmButtonColor: '#0d6efd'
                })
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    text: 'El usuario no pudo ser guardado',
                    footer: error.response.data.name,
                    confirmButtonColor: '#0d6efd'
                })
            })

        cleanForm();
    }

    const fetchData = async() => {
        const urlPersonType = 'http://localhost:8080/personType'
        const urlBranch = 'http://localhost:8080/branch'

        await axios.get(urlPersonType, { headers: {"x-token": sessionStorage.getItem("token-xL")}})
            .then( resp => setPersonTypes(resp.data.resData))
            .catch(error => console.log(error))
    
        await axios.get(urlBranch, {headers: {"x-token": sessionStorage.getItem("token-xL")}})
            .then( resp => resp.data.resData)
            .then( branchesData => setBranches(branchesData))
            .catch(error => console.log(error))    
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
        fetchData();
    }, [])

    return (
    <>
    <div className='person_container'>
        <P_Head text={'Crear Persona'} className={'p_h1'}/>
        <form className='person_form' onSubmit={savePerson}>
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
    </>
  )
}

export default CreatePerson