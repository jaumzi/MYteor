import React, { useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import EnumPresence from '../EnumPresence';
import { useTracker } from 'meteor/react-meteor-data';

const withUserAplication = (Component) => {

  return (props) => {
    let userLogged = useTracker(() => Meteor.user());
    const aplicationInit = (userLogged !== undefined);

    return <Component {...{ userLogged, aplicationInit }} {...props} />
  };
};


const setUserPresenceStatus = (status) => {
  const user = Meteor.user();

  if (user) {
    const newProfile = {
      ...user.profile,
      presenceStatus: status,
    };

    if (status === EnumPresence.ONLINE) {
      newProfile.lastOnlineDate = new Date();
    }

    Meteor.users.update({ _id: user._id }, {
      $set: {
        profile: newProfile
      },
    });
  }
}
const withUserPresence = (Component) => {

  return (props) => {
    const { userLogged } = props;

    useEffect(() => {
      if (/*@cc_on!@*/false) { // check for Internet Explorer
        document.onfocusin = () => setUserPresenceStatus(EnumPresence.ONLINE);
        document.onfocusout = () => setUserPresenceStatus(EnumPresence.ABSENT);
      } else {
        window.onfocus = () => setUserPresenceStatus(EnumPresence.ONLINE);
        window.onblur = () => setUserPresenceStatus(EnumPresence.ABSENT);
      }

      setUserPresenceStatus(EnumPresence.ONLINE);

      // se fechar navegador desloga usuario
      window.addEventListener("beforeunload", () => setUserPresenceStatus(EnumPresence.OFFLINE));
      return () => window.removeEventListener('beforeunload', () => { });
    }, [userLogged._id]);

    return <Component {...props} />;
  };
}

export { withUserPresence, setUserPresenceStatus, withUserAplication };
