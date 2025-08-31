import React from 'react';
import QRCode from 'react-qr-code';
import { Role } from '../types';

const roles: Role[] = ['controller', 'viewer', 'moderator', 'operator'];

// Displays shareable links and QR codes for each role
const RoleLinks: React.FC = () => {
  return (
    <div>
      <h2>Share Links</h2>
      {roles.map((role) => {
        const url = `${window.location.origin}/${role}`;
        return (
          <div key={role} style={{ marginBottom: '1rem' }}>
            <h3>{role}</h3>
            <a href={url}>{url}</a>
            <div style={{ height: 128, marginTop: 8 }}>
              <QRCode value={url} size={128} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RoleLinks;
