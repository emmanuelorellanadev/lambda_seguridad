import { useEffect, useReducer, useState, useContext } from 'react'
import { GlobalContext } from '../../context/GlobalContext';
import { parseJwt } from '../helpers/parseJwt';

import '../../css/user/userProfile.css'
import { P_Head } from '../ui/P_Head';
import { useUserProfile } from './hooks/useUserProfile';
import { useGetCompany } from '../companies/hooks/useGetCompany';
import { Toaster } from 'react-hot-toast';
import { useUpdatePass } from './hooks/useUpdatePass';
import { initialProfileState, profileReducer } from './reducers/profileReducer';

export const UserProfile = () => {
    const { urlLambda } = useContext(GlobalContext);

    const sessionData = parseJwt(sessionStorage.getItem('token-xL'));
    const [state, dispatch] = useReducer(profileReducer, initialProfileState);
    const [onLoad, setOnLoad] = useState(true);    
    
    const updatePassword = async(e) => {
        e.preventDefault();
        const urlUser = `${urlLambda}/changePassword/${sessionData.uid}`;
        useUpdatePass(urlUser, state.pass, state.passConfirm, state.currentPass);
        cleanForm();
    }
     
    const cleanForm = () => {
        dispatch({ type: "RESET_PASS" });
    }
    
    useEffect(() => {
        const urlUser = `${urlLambda}/user/${sessionData.uid}`;
        const urlCompany = `${urlLambda}/company/1`
        useUserProfile(urlUser, {
            setUserName: value => dispatch({ type: "SET_FIELD", field: "userName", value }),
            setUserCreation: value => dispatch({ type: "SET_FIELD", field: "userCreation", value }),
            setUserImg: value => dispatch({ type: "SET_FIELD", field: "userImg", value }),
            setRole: value => dispatch({ type: "SET_FIELD", field: "role", value }),
            setBranch: value => dispatch({ type: "SET_FIELD", field: "branch", value }),
        });
        useGetCompany(urlCompany, {
            setCompanies: value => dispatch({ type: "SET_FIELD", field: "companies", value }),
            setNextPage: value => dispatch({ type: "SET_FIELD", field: "nextPage", value }),
            setPrevPage: value => dispatch({ type: "SET_FIELD", field: "prevPage", value }),
            setOnLoad
        })
    }, [ onLoad])

    return (
    <>
        <div id='userProfile_container'>
            <h1 className='p_h1' id='headerUserProfile' >Perfil de {sessionData.name ? sessionData.name : ''}</h1>
                <P_Head className='p_h3' text="Datos de Usuario" />
            <form id="user_form">
                <div id='userImg'>
                    <img src={`${urlLambda}/public/${state.userImg}`} alt="" />
                    <button
                        type="button"
                        className="btn-change-img"
                        onClick={() => {/* lógica para cambiar imagen */}}
                    >
                        Cambiar Imagen
                    </button>
                </div>
                <div id='userData' >
                    <div>
                        <label className='label'>Usuario:</label>
                        <input className='form-control' type="text" name="user_name" value={state.userName || ''} readOnly/>
                    </div>
                    <div>
                        <label>Rol:</label>
                        <input className='form-control' type="text" name="role_name" id="role_name" value={state.role || ''} readOnly/>
                    </div>
                    <div>
                        <label>Empresa:</label>
                        <input className='form-control' type="text" name="company_name" id="company_name" value={state.companies.company_name || ''} readOnly />
                    </div>
                    <div>
                        <label>Sucursal:</label>
                        <input className='form-control' type="text" name="branch_name" id="branch_name" value={state.branch || ''} readOnly/>
                    </div> 
                    <div>
                        <label>Activo desde:</label>
                        <input className='form-control' type="text" name="creation_date" id="cration_date" value={state.userCreation || ''} readOnly/>
                    </div>
                </div> 
            </form>
                <P_Head className='p_h3' text="Cambiar Contraseña" />
            <form id='formChangePass' onSubmit={updatePassword}>
                <div className="form-group">
                    <label htmlFor="currentPass">Contraseña actual:</label>
                    <input
                        className='form-control'
                        type="password"
                        name="currentPass"
                        id="currentPass"
                        value={state.currentPass || ''}
                        onChange={e => dispatch({ type: "SET_FIELD", field: "currentPass", value: e.target.value })}
                        placeholder='Ingrese contraseña actual'
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pass">Nueva contraseña:</label>
                    <input
                        className='form-control'
                        type="password"
                        name="pass"
                        id="pass"
                        value={state.pass || ''}
                        onChange={e => dispatch({ type: "SET_FIELD", field: "pass", value: e.target.value })}
                        placeholder='Ingrese nueva contraseña'
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="passConfirm">Confirmar nueva contraseña:</label>
                    <input
                        className='form-control'
                        type="password"
                        name="passConfirm"
                        id="passConfirm"
                        value={state.passConfirm || ''}
                        onChange={e => dispatch({ type: "SET_FIELD", field: "passConfirm", value: e.target.value })}
                        placeholder='Confirme nueva contraseña'
                        required
                    />
                </div>
                <button className='btn btn-primary'>Guardar</button>
            </form>
        </div>
        <Toaster/>
    </>
  )
}