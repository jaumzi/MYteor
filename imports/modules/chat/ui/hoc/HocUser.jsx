import React, { useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import EnumPresence from '../../../user/util/EnumPresence';
import { useTracker } from 'meteor/react-meteor-data';
import { setUserstatus } from '../../../user/util/UserPresenceUtil';

const withUserAplication = (Component) => {

  return (props) => {
    let userLogged = useTracker(() => Meteor.user());
    const aplicationInit = (userLogged !== undefined);

    return <Component {...{ userLogged, aplicationInit }} {...props} />
  };
};

const withUserPresence = (Component) => {

  return (props) => {
    const { userLogged } = props;

    useEffect(() => {

      if (/*@cc_on!@*/false) { // check for Internet Explorer
        document.onfocusin = () => setUserstatus(Meteor.userId(), { status: EnumPresence.ONLINE });
        document.onfocusout = () => setUserstatus(Meteor.userId(), { status: EnumPresence.ABSENT });
      } else {
        window.onfocus = () => setUserstatus(Meteor.userId(), { status: EnumPresence.ONLINE });
        window.onblur = () => setUserstatus(Meteor.userId(), { status: EnumPresence.ABSENT });
      }

      // se fechar navegador desloga usuario
      window.addEventListener("beforeunload", () => setUserstatus(Meteor.userId(), { status: EnumPresence.OFFLINE }));

      return () => window.removeEventListener('beforeunload', () => { });
    }, [userLogged._id]);

    return <Component {...props} />;
  };
}

export { withUserPresence, setUserstatus, withUserAplication };
