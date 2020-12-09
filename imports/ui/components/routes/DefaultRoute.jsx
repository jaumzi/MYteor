import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ROUTES } from '../../config/RoutesConfig';
import { AppContext } from '../../config/AppContext';
// import { AppContext } from '../../config/AppContext';

// metodo para pegar a permissão dentro do obj user
// const GetUserPermission = user => user?.permission;

function DefaultRoute(props) {
  const { component: Component, permissions = [], isProtected, ...rest } = props;

  const ctx = useContext(AppContext);
  const { userLogged } = ctx;

  function canPermit() {
    // if (aplicationInit && (
    //   permissions.length === 0 ||
    //   (permissions.length > 0 && !!user && permissions.includes(GetUserPermission(user)))
    // )) {
    //   return true;
    // }
    // if (!aplicationInit) {
    //   // como é redirecionamento espera aplicacao iniciar para ter certeza do valor em user
    //   return true;
    // }
    // return false;
    
    // if (permissions.length === 0 && !isProtected) {
    //   return true;
    // }
    // if (userLogged === null) {
    // // null quando não tem login, undefined quando nao carregou
    //   return false;
    // }
    return true;
  }

  const permit = canPermit();

  // if (aplicationInit && !permit) {
  //   showNotification('error', 'Acesso negado!', 'Você não possuí permissão de acesso!', undefined, 4000);
  // }

  // console.log("route", props.path, userLogged, permit, permissions,isProtected);
  return (
    <Route
      {...rest}
      render={(propsRender, context) =>
        permit
          ? <Component {...props} {...propsRender} {...context} {...rest} />
          : <Redirect to={ROUTES.LOGIN.src()} />
      }
    />
  );
}

export default DefaultRoute;
