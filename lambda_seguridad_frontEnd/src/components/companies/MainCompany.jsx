import { useEffect, useState } from 'react'

import '../../css/company/company.css';
import { P_Head } from'../ui/P_Head';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';
import { Table_branch } from '../ui/tables/Table_branch.jsx';
import { useGetCompany } from './hooks/useGetCompany.js';

const MainCompany = () => {

  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [mission, setMission] = useState('');
  const [vision, setVision] = useState('');
  const [logo, setLogo] = useState([]);
  const [onLoad, setOnLoad] =useState(true)

  useEffect( () => {
    setOnLoad(true)
    const urlCompany = `http://localhost:8080/company/1`
        useGetCompany(urlCompany, { setCompany, setAddress, setPhone, setDescription, setMission, setVision, setLogo});
  }, []) 
  return (
    <>
      <div className='company_container'>
        <P_Head className="p_h1" text="Información de Empresa" />
        <form className='company_form'>
          <div className='companyLogo_container'>
              <img src={`http://localhost:8080/public/${logo}`} alt="" />
          </div>
          <div className='companyData_container'>
            <div>
              <Label lambdaClassLabel={""} text="Nombre"/>
              <Input lambdaClassInput={""} type="text" value={company} readOnly />
            </div>
            <div>
              <Label lambdaClassLabel={""} text="Teléfono"/>
              <Input lambdaClassInput={""} type="number" value={phone} readOnly/>
            </div>
            <div>
              <Label lambdaClassLabel={""} text="Dirección"/>
              <Input lambdaClassInput={""} type="text" value={address} readOnly />
            </div>
          </div>
          <div className='companyMissionVision_container'>
            <div>
              <Label lambdaClassLabel={""} text="Misión"/>
              <TextArea lambdaClassTextArea={""} value={mission} readOnly name="mission" id="mission"/>
            </div>
            <div>
              <Label lambdaClassLabel={""} text="Visión"/>
              <TextArea lambdaClassTextArea={""} value={vision} readOnly name="vision" id="vision"/>
            </div>
          </div>
        </form>

        {/* Branchs table */}
        <P_Head className="p_h1" text={'Sucursales'}/>
        <div className='table-responsive companyTable_container'> 
          <Table_branch columns={["#", "Sucursal", "Dirección", "Teléfono"]} setOnLoad={setOnLoad}/>
        </div>
      </div>
    </>
  )
}

export default MainCompany