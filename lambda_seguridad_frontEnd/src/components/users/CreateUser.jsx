import { useReducer, useEffect, useContext, useState } from 'react';

import '../../css/user/user.css';
import { P_Head } from '../ui/P_Head';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useCreateUser } from './hooks/useCreateUser';
import { Toaster } from 'react-hot-toast';
import { useGetRole } from '../roles/hooks/useGetRole';
import { useGetCompany } from '../companies/hooks/useGetCompany';
import { useGetBranch } from '../branches/hooks/useGetBranch';
import { GlobalContext } from '../../context/GlobalContext.jsx';
import { initialUserState, userReducer } from './reducers/userReducer.jsx';

export const CreateUser = () => {

    const { urlLambda, token } = useContext(GlobalContext);

    const [state, dispatch] = useReducer(userReducer, initialUserState);
    const [onLoad, setOnLoad] = useState(true);

    // Handler para mostrar vista previa de imagen
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            dispatch({ type: "SET_FIELD", field: "userImage", value: file });
            dispatch({ type: "SET_FIELD", field: "previewImage", value: previewUrl });
        } else {
            dispatch({ type: "SET_FIELD", field: "userImage", value: '' });
            dispatch({ type: "SET_FIELD", field: "previewImage", value: '' });
        }
    };

    const saveButton = (e) => {
        e.preventDefault();
        const urlUser = `${urlLambda}/user/`;
        useCreateUser(urlUser, state.userImage, state.state, { setOnLoad }, token);
        cleanForm();
    }

    const cleanForm = () => {
        dispatch({ type: "RESET_FORM" });
        document.getElementById('formCreateUser').reset();
        dispatch({ type: "SET_FIELD", field: "previewImage", value: '' });
    }

    useEffect(() => {
        const urlRole = `${urlLambda}/role/`;
        const urlCompany = `${urlLambda}/company/`;
        const urlBranch = `${urlLambda}/branch/`;
        useGetRole(urlRole, {
            setRoles: value => dispatch({ type: "SET_FIELD", field: "roles", value }),
        });
        useGetCompany(urlCompany, token, {
            setCompanies: value => dispatch({ type: "SET_FIELD", field: "companies", value }),
            setOnLoad
        });
        useGetBranch(urlBranch, token, {
            setBranches: value => dispatch({ type: "SET_FIELD", field: "branches", value }),
        });
    }, [onLoad, urlLambda]);

    return (
        <div id='user_container'>
            <P_Head className="p_h1" text={'Registrar nuevo Usuario'} />
            <form className='user_form' encType='multipart/form-data' id='formCreateUser' onSubmit={saveButton}>
                <section id='uploadUserImg'>
                    <div className="uploadUserImg-flex">
                        <div id='previewImg'>
                            <div className="user-img-preview">
                                {state.previewImage ? (
                                    <img
                                        src={state.previewImage}
                                        alt="Vista previa"
                                    />
                                ) : (
                                    <div className="img-placeholder">
                                        {/* Aquí puedes agregar un ícono SVG si lo deseas */}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div id='uploadImgInput'>
                            <Input
                                lambdaClassInput={""}
                                type="file"
                                name="img"
                                id="img"
                                accept="image/png, image/jpeg"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>
                </section>
                <div>
                    <Label lambdaClassLabel={""} text="Usuario:" />
                    <Input lambdaClassInput={""} type="text" name='user_name' id='user_name' value={state.user || ''} placeholder='Nombre del Usuario' onChange={e => dispatch({ type: "SET_FIELD", field: "user", value: e.target.value })} autoFocus required />
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Contraseña:" />
                    <Input lambdaClassInput={""} type="password" name='user_pass' id='user_pass' placeholder='Contrasena' value={state.pass || ''} onChange={e => dispatch({ type: "SET_FIELD", field: "pass", value: e.target.value })} autoComplete='off' required />
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Rol:" />
                    <Select data={state.roles?.data} text="Selecciona Rol" name='RoleId' id='selectRole' value={state.roleId || ''} onChange={e => dispatch({ type: "SET_FIELD", field: "roleId", value: e.target.value })} required />
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Estado" />
                    <Input lambdaClassInput={""} type="checkbox" name='user_state' id='user_state' onChange={() => dispatch({ type: "SET_FIELD", field: "state", value: !state.state })} checked={state.state} />
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Empresa:" />
                    <Select data={state.companies?.data} value={state.selectedCompany || "1"} id='selectCompany' onChange={e => dispatch({ type: "SET_FIELD", field: "selectedCompany", value: e.target.value })} required disabled />
                </div>
                <div>
                    <Label lambdaClassLabel={""} text="Sucursal:" />
                    <Select data={state.branches?.data} text="Selecciona Sucursal" name='BranchId' id='selectBranch' value={state.branchId || ''} onChange={e => dispatch({ type: "SET_FIELD", field: "branchId", value: e.target.value })} required />
                </div>
                <div className='User_button'>
                    <button className={'btn btn-primary'} id='saveButton'>Guardar</button>
                </div>
            </form>
            <Toaster />
        </div>
    )
}