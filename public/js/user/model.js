const getRef = () => {
  const authUser = firebase.auth().currentUser;

  return firebase.database().ref('users/' + authUser.uid);
}

const createUser = () => {
  const authUser = firebase.auth().currentUser;
  const newUser = {
    uid: authUser.uid,
    name: authUser.displayName,
    email: authUser.email,
    birthday: null,
    nationality: null,
    role: null
  };

  firebase.database().ref('users/' + authUser.uid)
    .set(newUser);

  return newUser;
}

const getUser = () => {
  return getRef()
    .once('value')
    .then((userData) => {
      if (userData.val() === null) {
        return createUser();
      } else {
        return userData.val();
      }
    })
    .catch((error) => {
      return createUser();
    });
}

const saveUserData = (key, value) => {
  getRef()
    .update({ [key]: value });
}