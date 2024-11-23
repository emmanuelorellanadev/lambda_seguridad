import { useEffect, useState } from 'react';

import '../../css/room/room.css';
import Table_room from '../ui/tables/Table_room.jsx';
import { Toaster } from 'react-hot-toast';

const ListRoom = (props) => {
    
  const [ onLoad, setOnLoad ] = useState( true )

  const editRoom = (roomId) => {
    props.navUpdateRoom(roomId)
  }

  useEffect( () => {
    setOnLoad(true)
  }, [onLoad]);

  return (
    <>
      <div className='room_container' >
          <div className='table-responsive companyTable_container' >
              <Table_room columns={["Número", "Cámas", "Personas", "Información"]} editData={editRoom} />
          </div>
      </div>
      <Toaster/>
    </>
  )
}

export default ListRoom