import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { AppContext } from '../../config/AppContext';
import { ROUTES } from '../../config/RoutesConfig';
import { withUserPresence } from '../../util/hoc/HocUser';
import { prepareComponent } from '../../util/hoc/HocComponents';

function InfoUserComponent(props) {
  const { userLogged } = props;

  const history = useHistory();
  const ctx = useContext(AppContext);
  const { logout } = ctx;

  const handleLogout = () => {
    logout();
    history.push(ROUTES.LOGIN.src());
  };

  return (
    <>
      <div className="header-layout" >
        <p>{`${userLogged.username} (${userLogged?.profile?.presence?.status})`}</p>
        <button onClick={handleLogout}>Sair</button>
      </div>
    </>
  );
}

const InfoUser = withTracker((props) => {
  const userLogged = Meteor.user();
  console.log(userLogged?.profile?.presence);
  return {
    ...props,
    userLogged
  };
})(prepareComponent(withUserPresence(InfoUserComponent), { awaits: ['userLogged'] }));

export default InfoUser;
