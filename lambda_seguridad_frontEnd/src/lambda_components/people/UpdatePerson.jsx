import axios from 'axios';
import React, { useEffect, useState } from 'react'

import '../../css/person/person.css'
import { P_Head } from '../ui/P_Head';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Select } from '../ui/Select';
import Swal from 'sweetalert2';

const UpdatePerson = (props) => {

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

  
  const updatePerson = async(e) => {
    e.preventDefault();
    
    const url = `http://localhost:8080/person/${props.personId}`;
    await axios.put(url, 
      {
        "person_name": names,
        "person_surnames": surNames,
        "person_cui": cui,
        "person_nit": nit,
        "person_phone": phone,
        "person_address": address,
        "PersonTypeId": personTypeId,
        "BranchId": branchId
      }, {headers: {"x-token": sessionStorage.getItem("token-xL")}} )
        .then( () =>{
          Swal.fire({
            icon: 'success',
            title: `Actualización realizada correctamente`,
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
            confirmButtonColor: '#0d6efd',
            footer: error.response.data.errors
          })
        })
  }
  
  
  const fetchData = async() => {
    const urlPerson = `http://localhost:8080/person/${props.personId}`

    //Fetch and fill Person data
    await axios.get(urlPerson, {headers: {"x-token": sessionStorage.getItem("token-xL")}})
      .then( resp => resp.data.resData)
      .then( person => {
        setNames(person.person_names);
        setSurNames(person.person_surnames);
        setCui(person.person_cui);
        setNit(person.person_nit);
        setPhone(person.person_phone);
        setAddress(person.person_address);        
        setPersonTypeId(person.PersonTypeId);
        setBranchId(person.BranchId);
      })
      .catch( error => console.log(error))

    //Fetch and fill personTypes data
    const urlPersonType = 'http://localhost:8080/personType/'
    await axios.get(urlPersonType, {headers: {"x-token": sessionStorage.getItem("token-xL")}})
      .then( resp => resp.data.resData)
      .then( personTypes => {
        setPersonTypes(personTypes)
      })
      .catch( error => console.log(error))

      //Fetch and fill Branches data
      const urlBranch = 'http://localhost:8080/branch/'
      await axios.get(urlBranch, {headers: {"x-token":  sessionStorage.getItem("token-xL")}})
      .then( resp => resp.data.resData)
      .then(branches =>{
        setBranches(branches)
      })
      .catch( error => console.log(error))
    }


  useEffect( () => {
    fetchData();
    console.log()
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
              <Select data={personTypes} text={'Selecciona Tipo'} value={personTypeId} onChange={ (e) => {setPersonTypeId(e.target.value)}} required />
              </div>            
              <div>
              <Label lambdaClassLabel={""} text="Sucursal"/>
                <Select data={branches} text={'Selecciona Sucursal'} value={branchId} onChange={ (e) => {setBranchId(e.target.value)}} required />
              </div>
              <div className='sendPerson_button'>
                <button className='btn btn-primary'>Actualizar</button>
              </div>
        </form>
    </div>
    </>
  )
}

export default UpdatePerson
