import EnumPresence from "./EnumPresence";


const setUserstatus = (userId, presence) => {

  let user;

  if(Meteor.isClient) {
    user = Meteor.user();
  } else {
    user = Meteor.users.find({ _id: userId }).fetch();
  }

  // evitar atualização desnecessária de alterações para o mesmo status
  if (user && user?.profile?.presence?.status !== presence.status) {

    const newProfile = {
      ...user?.profile?.presence,
      ...presence
    };

    // se presença anterior era online, salva data
    if (presence.status === EnumPresence.ONLINE) {
      newProfile.lastOnlineDate = new Date();
    }

    Meteor.users.update({ _id: userId }, {
      $set: {
        'profile.presence': newProfile
      },
    });
  }
}

export { setUserstatus };
