import { useState, useEffect} from 'react';
import { Toaster } from 'react-hot-toast';

import { P_Head } from '../ui/P_Head';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { Table_roomState } from '../ui/table_roomState/Table_roomState';
import { useDeleteRoomState } from './hooks/useDeleteRoomState';
import { useCreateRoomState } from './hooks/useCreateRoomState';

const CreateListRoomState = ({ navUpdateRoomState}) => {

    const [ roomStateName, setRoomStateName ] = useState('');
    const [ roomStateState, setRoomStateState ] = useState(true);
    const [ onLoad, setOnLoad ] = useState(true);

    const saveRoomState = (e) => {
        e.preventDefault();
        const urlRoomState = `http://localhost:8080/roomState/`;
        useCreateRoomState(urlRoomState, roomStateName, roomStateState, { setOnLoad });
        setRoomStateName('');
        setRoomStateState(true)
    }

    const editRoomState = (id) => {
        navUpdateRoomState(id)
    }

    const deleteRoomState = (id, name, { setOnLoad }) => {
        const urlRoomState = `http://localhost:8080/roomState/${id}`;
        useDeleteRoomState(urlRoomState, setOnLoad );
    }

    return(
        <>
            {/* Create section */}
            <div className='role_container'>
                <P_Head text={'Administración de estado de Habitaciones'} className={'p_h1'}/>
                <P_Head text={'Crear Estado de Habitación'} className={'p_h2'}/>
            <form className={'role_form'} onSubmit={e => saveRoomState(e)}>
                <div>
                    <Label lambdaClassLabel="" text="Estado:"/>
                    <Input lambdaClassInput="" type="text"  value={roomStateName} onChange={(e) => setRoomStateName( e.target.value )} placeholder='Estado de habitación' required autoFocus/>
                </div>
                <div>
                    <Label lambdaClassLabel="" text="Estado:"/>
                    <Input lambdaClassInput="" type="checkbox" value={roomStateState} onChange={ (e) => setRoomStateState(!roomStateState) } checked={roomStateState} />
                </div>
                <div></div>
                <div className='sendRole_button'>
                    <button className='btn btn-primary' >Guardar</button>
                </div>
            </form>
            {/* Table section */}
            <P_Head text={'Lista de Estados de Habitación'} className={'p_h2'}/>
            <div className='table-responsive roleTable_container'>
                <Table_roomState columns={["Id", "Nombre", "Estado"]} editData={editRoomState} deleteData={deleteRoomState} setOnLoad={setOnLoad} onLoad={onLoad}/>
            </div>
        </div>
        <Toaster/>
        </>
    )
}

export default CreateListRoomState;