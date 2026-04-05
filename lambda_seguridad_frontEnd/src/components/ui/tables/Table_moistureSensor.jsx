import React, { useContext, useEffect, useState } from 'react';

import '../../../css/ui/table.css';
import { Input } from '../Input';
import Pagination from '../Pagination';
import { useGetMoistureSensorData } from '../../moistureSensor/hooks/useGetMoistureSensorData';
import { GlobalContext } from '../../../context/GlobalContext';

export const Table_moistureSensor = ({ columns, setOnLoad, onLoad, ...props }) => {
  const { urlLambda } = useContext(GlobalContext);
  const [readings, setReadings] = useState({});
  const [search, setSearch] = useState('');
  const [rowsByPage, setRowsByPage] = useState(10);
  const [page, setPage] = useState(1);
  const [prevPage, setPrevPage] = useState('');
  const [nextPage, setNextPage] = useState('');

  const fetchReadings = async () => {
    const url = `${urlLambda}/moisture-sensor/readings?limit=${rowsByPage}&page=${page}&sensor_id=${search}`;
    await useGetMoistureSensorData(url, { setReadings, setNextPage, setPrevPage });
  };

  const searching = (query) => {
    setSearch(query);
    setPage(1);
    if (setOnLoad) setOnLoad(false);
  };

  useEffect(() => {
    if (setOnLoad) setOnLoad(true);
    fetchReadings();
  }, [onLoad, search, page, rowsByPage]);

  return (
    <>
      <div className="table-controls">
        <Input
          lambdaClassInput="data_search"
          type="search"
          value={search}
          onChange={e => searching(e.target.value)}
          placeholder="Filtrar por ID de sensor"
          aria-label="Filtrar por ID de sensor"
        />
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped user-table" {...props}>
          <thead className="text-center t_header">
            <tr key={0}>
              {columns?.map(column => <th key={column}>{column}</th>)}
            </tr>
          </thead>
          <tbody className="text-center align-baseline">
            {readings.data?.map(reading => (
              <tr key={reading.id}>
                <th>{reading.id}</th>
                <td data-label="Sensor">{reading.sensor_id}</td>
                <td data-label="Humedad">{reading.moisture_value} %</td>
                <td data-label="Aspersor">
                  <span className={reading.activate_sprinkler ? 'badge bg-success' : 'badge bg-secondary'}>
                    {reading.activate_sprinkler ? 'Activado' : 'Inactivo'}
                  </span>
                </td>
                <td data-label="Fecha">{reading.reading_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        rowsByPage={rowsByPage}
        setRowsByPage={setRowsByPage}
        prevPage={prevPage}
        nextPage={nextPage}
        total={readings.total}
        setOnLoad={setOnLoad}
      />
    </>
  );
};

export default Table_moistureSensor;
