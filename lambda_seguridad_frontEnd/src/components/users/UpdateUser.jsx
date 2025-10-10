import React, { useReducer, useEffect, useContext } from 'react';

import '../../css/user/user.css';
import { P_Head } from '../ui/P_Head';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useUpdateUser } from './hooks/useUpdateUser';
import { Toaster } from 'react-hot-toast';
import { useGetRole } from '../roles/hooks/useGetRole';
import { useGetCompany } from '../companies/hooks/useGetCompany';
import { useGetUser } from './hooks/useGetUser';
import { useGetBranch } from '../branches/hooks/useGetBranch';
import { initialUserState, userReducer } from './reducers/userReducer';
import { GlobalContext } from '../../context/GlobalContext';

export const UpdateUser = (props) => {
    const { urlLambda } = useContext(GlobalContext);
    const [state, dispatch] = useReducer(userReducer, initialUserState); 

    const updateButton = (e) => {
        e.preventDefault();
        const urlUser = `${urlLambda}/user/${props.userToEdit}`;
        useUpdateUser(urlUser, state.state, props);
    }

    const erasePassword = () => {
        dispatch({ type: "SET_FIELD", field: "pass", value: "" });
    }

    useEffect(() => {
        const urlRole = `${urlLambda}/role/`;
        const urlUser = `${urlLambda}/user/${props.userToEdit}`;
        const urlCompany = `${urlLambda}/company/`;
        const urlBranch = `${urlLambda}/branch/`;
        useGetRole(urlRole, {
            setRoles: value => dispatch({ type: "SET_FIELD", field: "roles", value }),
            setNextPage: value => dispatch({ type: "SET_FIELD", field: "nextPage", value }),
            setPrevPage: value => dispatch({ type: "SET_FIELD", field: "prevPage", value })
        });
        // Pasamos null como paginationDispatch (no se usa para un GET por id) y dispatch como userDispatch
        useGetUser(
            urlUser,
            null,
            dispatch
        );
        useGetCompany(urlCompany, {
            setCompanies: value => dispatch({ type: "SET_FIELD", field: "companies", value }),
            setNextPage: value => dispatch({ type: "SET_FIELD", field: "nextPage", value }),
            setPrevPage: value => dispatch({ type: "SET_FIELD", field: "prevPage", value })
        });
        useGetBranch(urlBranch, {
            setBranches: value => dispatch({ type: "SET_FIELD", field: "branches", value }),
            setNextPage: value => dispatch({ type: "SET_FIELD", field: "nextPage", value }),
            setPrevPage: value => dispatch({ type: "SET_FIELD", field: "prevPage", value })
        });
    }, []);

    return (
        <div id='user_container'>
            <P_Head className="p_h1" text={'Actualizar Usuario'} />
            <form encType='multipart/form-data' className='user_form' id='UpdateUser_form' onSubmit={updateButton}>
                <div>
                    <Label text="Usuario:" lambdaClassLabel={""} />
                    <Input lambdaClassInput={""} name='user_name' id='userName' type="text" value={state.user || ''} onChange={e => dispatch({ type: "SET_FIELD", field: "user", value: e.target.value })} required />
                </div>
                <div>
                    <Label text="Contraseña:" lambdaClassLabel={""} />
                    <Input lambdaClassInput={""} name='user_pass' id='userPassword' type="password" value={state.pass || ''} autoComplete='off' onChange={e => dispatch({ type: "SET_FIELD", field: "pass", value: e.target.value })} onClick={erasePassword} required />
                </div>
                <div>
                    <Label text="Rol:" lambdaClassLabel={""} />
                    <Select data={state.roles?.data} name='RoleId' id='selectRole' value={state.roleId || ''} onChange={e => dispatch({ type: "SET_FIELD", field: "roleId", value: e.target.value })} required />
                </div>
                <div id='userState'>
                    <Label text="Estado:" lambdaClassLabel={""} />
                    <Input lambdaClassInput={""} type='checkbox' name='user_state' id='userState' onChange={() => dispatch({ type: "SET_FIELD", field: "state", value: !state.state })} checked={state.state} />
                </div>
                <div>
                    <Label text="Empresa:" lambdaClassLabel={""} />
                    <Select data={state.companies?.data} className='' id='selectCompany' value={state.selectedCompany || "1"} onChange={e => dispatch({ type: "SET_FIELD", field: "selectedCompany", value: e.target.value })} required disabled />
                </div>
                <div>
                    <Label text="Sucursal:" lambdaClassLabel={""} />
                    <Select data={state.branches?.data} name='BranchId' id='selectBranch' value={state.branchId || ''} onChange={e => dispatch({ type: "SET_FIELD", field: "branchId", value: e.target.value })} required />
                </div>
                <section>
                    <P_Head className="p_h3" text={'Cambiar Imágen'} />
                    <Input lambdaClassInput={""} type="file" name="img" id="imgUser" value={state.userImage || ''} onChange={e => dispatch({ type: "SET_FIELD", field: "userImage", value: e.target.value })} />
                </section>
                <div className='sendUser_button'>
                    <button className='btn btn-primary'>Actualizar Usuario</button>
                </div>
            </form>
            <Toaster />
        </div>
    )
}
