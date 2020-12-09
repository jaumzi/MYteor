import React, { createContext, useEffect, useState } from 'react';
import Loading from '../components/loading/Loading';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import EnumPresence from '../util/EnumPresence';
import { setUserPresenceStatus } from '../util/hoc/HocUserPresence';

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

    const login = (name, password, treatment = () => {}) => {
        Meteor.loginWithPassword(name, password, (err) => treatment(err));
    }
    const logout = () => {
        setUserPresenceStatus(EnumPresence.OFFLINE);
        Meteor.logout();
    }

    return (
        <AppContext.Provider
            value={{
                ...state,
                loadingMsg,
                login,
                logout
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
