import React, {useState} from 'react';

import CreatePerson from './CreatePerson';
import ListPerson from './ListPerson';
import UpdatePerson from './UpdatePerson';


const SubMenuPerson = () => {
  const [ createPerson, setCreatePerson ] = useState(0);
  const [ listPerson, setListPerson ] = useState(1);
  const [ updatePerson, setUpdatePerson ] = useState(0);
  const [ personId, setPersonId] =useState('');

  const navCreatePerson = () => {
      setCreatePerson(1);
      setListPerson(0);
      setUpdatePerson(0);
    }

    const navListPerson = () => {
      setCreatePerson(0);
      setListPerson(1);
      setUpdatePerson(0);
  }

  const navEditPerson = (personId) => {
      setCreatePerson(0);
      setListPerson(0);
      setUpdatePerson(1);
      setPersonId(personId);
  }

  return (
    <>
    <h1></h1>
    <div className='subMenu'>
      <ul>
        <li onClick={navCreatePerson}>Crear</li>
        <li onClick={navListPerson}>Listar</li>
      </ul>
    </div>
      { createPerson === 1 && <CreatePerson />}
      { listPerson === 1 && <ListPerson navEditPerson={navEditPerson} />}
      { updatePerson === 1 && <UpdatePerson  personId={personId}/>}
    </>
  )

}

export default SubMenuPerson;