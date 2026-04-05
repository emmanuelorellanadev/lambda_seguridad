import React, { useContext, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

import '../../css/ui/headings.css';
import '../../css/moistureSensor/moistureSensor.css';
import { P_Head } from '../ui/P_Head';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import Table_moistureSensor from '../ui/tables/Table_moistureSensor';
import { GlobalContext } from '../../context/GlobalContext';

const ListMoistureSensor = () => {
  const { urlLambda } = useContext(GlobalContext);
  const [sensorId, setSensorId] = useState('sensor_01');
  const [latestStatus, setLatestStatus] = useState(null);
  const [onLoad, setOnLoad] = useState(true);

  const fetchLatestStatus = async () => {
    if (!sensorId.trim()) return;
    try {
      const resp = await axios.get(`${urlLambda}/moisture-sensor/status/${sensorId.trim()}`, {
        headers: { 'x-token': sessionStorage.getItem('token-xL') },
      });
      setLatestStatus(resp.data.resData);
    } catch {
      setLatestStatus(null);
    }
  };

  useEffect(() => {
    fetchLatestStatus();
  }, [sensorId, onLoad]);

  return (
    <>
      <div className="moistureSensor_container">
        <P_Head text="Monitor de Humedad de Suelo (ESP8266)" className="p_h1" />

        {/* Sensor selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <Label lambdaClassLabel="" text="ID Sensor:" />
          <Input
            lambdaClassInput=""
            type="text"
            value={sensorId}
            onChange={e => setSensorId(e.target.value)}
            placeholder="sensor_01"
          />
          <button className="btn btn-primary btn-sm" onClick={fetchLatestStatus}>
            Actualizar
          </button>
        </div>

        {/* Status card */}
        {latestStatus && (
          <div
            className="moistureSensor_status_card"
            style={{ background: latestStatus.activate_sprinkler ? '#d4edda' : '#f8f9fa', border: '1px solid #dee2e6' }}
          >
            <div className="moistureSensor_status_item">
              <span className="moistureSensor_status_label">Sensor</span>
              <span className="moistureSensor_status_value">{latestStatus.sensor_id}</span>
            </div>
            <div className="moistureSensor_status_item">
              <span className="moistureSensor_status_label">Humedad actual</span>
              <span className="moistureSensor_status_value">{latestStatus.moisture_value} %</span>
            </div>
            <div className="moistureSensor_status_item">
              <span className="moistureSensor_status_label">Umbral de activación</span>
              <span className="moistureSensor_status_value">{'< ' + latestStatus.threshold + ' %'}</span>
            </div>
            <div className="moistureSensor_status_item">
              <span className="moistureSensor_status_label">Aspersor</span>
              <span
                className={`badge ${latestStatus.activate_sprinkler ? 'bg-success' : 'bg-secondary'}`}
                style={{ fontSize: '1.2rem', padding: '0.5rem 1rem' }}
              >
                {latestStatus.activate_sprinkler ? '💧 Activado' : '⏸ Inactivo'}
              </span>
            </div>
            <div className="moistureSensor_status_item">
              <span className="moistureSensor_status_label">Última lectura</span>
              <span className="moistureSensor_status_value" style={{ fontSize: '0.9rem' }}>
                {latestStatus.reading_at}
              </span>
            </div>
          </div>
        )}

        {/* Readings table */}
        <P_Head text="Historial de Lecturas" className="p_h2" />
        <div className="table-responsive moistureSensorTable_container">
          <Table_moistureSensor
            columns={['ID', 'Sensor', 'Humedad (%)', 'Aspersor', 'Fecha']}
            setOnLoad={setOnLoad}
            onLoad={onLoad}
          />
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default ListMoistureSensor;
