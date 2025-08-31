import React, { useEffect, useState } from 'react';
import { listenDevices, exportLogs } from '../services/deviceSync';
import { Device } from '../types';
import { useTranslation } from 'react-i18next';

const DeviceList: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const unsub = listenDevices(setDevices);
    return () => unsub();
  }, []);

  return (
    <div>
      <h2>{t('devices.title')}</h2>
      <table>
        <thead>
          <tr>
            <th>{t('devices.id')}</th>
            <th>{t('devices.lastSeen')}</th>
            <th>{t('devices.logs')}</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{new Date(d.lastSeen).toLocaleString()}</td>
              <td>
                <button onClick={() => exportLogs(d)}>{t('devices.export')}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceList;
