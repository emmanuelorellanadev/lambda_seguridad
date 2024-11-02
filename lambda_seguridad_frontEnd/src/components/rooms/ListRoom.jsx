import { useEffect, useState } from 'react';

import '../../css/room/room.css';
import {P_Head} from '../ui/P_Head.jsx';
import Table_room from '../ui/tables/Table_room.jsx';
// import { useDeleteRoom } from './hooks/useDeleteRoom.js';

const ListRoom = (props) => {
    
    const [ onLoad, setOnLoad ] = useState( true )

    const editRoom = (roomId) => {
        props.navUpdateRoom(roomId)
    }

    const deleteRoom = (roomId) => {
        console.log(roomId)
    }
    useEffect( () => {
    setOnLoad(true);
    }, [onLoad])
  return (
    <>
    <div className='room_container' >
        <div>
            <P_Head className="p_h1" text="Listado de Habitaciones"/>
        </div>
        <div className='table-responsive companyTable_container' >
            <Table_room columns={["Número", "Cámas", "Personas", "Teléfono ", "Estado"]} editData={editRoom} deleteData={deleteRoom} />
        </div>
    </div>
    </>
  )
}

export default ListRoom
