import React from 'react';
import Routes from '../components/routes/Routes';
import { AppContextProvider } from './AppContext';

const AppConfig = () => (
  <>
    <AppContextProvider>
      <Routes />
    </AppContextProvider>
  </>
);

export default AppConfig;