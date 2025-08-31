import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n';
import Controller from './pages/Controller';
import Viewer from './pages/Viewer';
import Moderator from './pages/Moderator';
import Operator from './pages/Operator';
import RoleLinks from './components/RoleLinks';
import { AuthProvider } from './context/AuthContext';
import { TimersProvider } from './context/TimersContext';

const path = window.location.pathname.replace(/\/$/, '').toLowerCase();

const getComponent = (): React.ReactElement => {
  switch (path) {
    case '/controller':
      return <Controller />;
    case '/viewer':
      return <Viewer />;
    case '/moderator':
      return <Moderator />;
    case '/operator':
      return <Operator />;
    default:
      return <RoleLinks />;
  }
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <TimersProvider>{getComponent()}</TimersProvider>
    </AuthProvider>
  </React.StrictMode>
);
