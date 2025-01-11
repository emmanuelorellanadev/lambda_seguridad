import { useEffect, useState } from 'react';

import '../../css/reservation/reservation.css';
import Table_reservation from '../ui/tables/Table_reservation';
import { Toaster } from 'react-hot-toast';

const ListReservation = (props) => {
    
  const [ onLoad, setOnLoad ] = useState( true )

  const editReservation = (reservationId) => {
    // props.navUpdateRoom(roomId)
  }

  useEffect( () => {
    setOnLoad(true)
  }, [onLoad]);

  return (
    <>
      <div className='reservation_container' >
          <div className='table-responsive companyTable_container' >
              <Table_reservation columns={["Habitación", "Cliente", "Datos de reservación", "Estado"]} editData={editReservation} />
          </div>
      </div>
      <Toaster/>
    </>
  )
}

export default ListReservation