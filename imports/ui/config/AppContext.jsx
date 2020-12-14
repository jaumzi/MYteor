import React, { createContext, useState } from 'react';
import Loading from '../components/loading/Loading';
import { Meteor } from 'meteor/meteor';
import EnumPresence from '../../modules/user/util/EnumPresence';
import { setUserstatus } from '../util/hoc/HocUser';

const AppContext = createContext({
  loading: false,
  loadingText: '',
  loadingMsg: () => { },
  login: () => { },
  logout: () => { },
});

function AppContextProviderComponent(props) {
  const { children } = props;

  const [state, setState] = useState({
    loading: false,
    loadingText: '',
    aplicationInit: true
  });
  const { loading, loadingText, aplicationInit } = state;

  const loadingMsg = (show = false, text = 'Carregando') => {
    setState(prev => ({
      ...prev,
      loading: show,
      loadingText: text,
    }));
  };

  const login = (name, password, treatment = () => { }) => {
    Meteor.loginWithPassword(name, password, (err) => treatment(err));
  }
  const logout = () => {
    const user = Meteor.user();
    console.log({
      ...user?.profile?.presence,
      status: EnumPresence.OFFLINE
    });
    setUserstatus(user._id, {
      ...user?.profile?.presence,
      status: EnumPresence.OFFLINE
    });
    Meteor.logout();
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        loadingMsg,
        login,
        logout,
      }}
    >
      {loading && <Loading text={loadingText} />}
      {/* <Toast notification={notification} close={closeNotification} /> */}
      {aplicationInit
        ? children
        : <Loading text="Iniciando aplicação ..." />}
    </AppContext.Provider>
  );
}

const AppContextProvider = AppContextProviderComponent;

export { AppContextProvider, AppContext };
