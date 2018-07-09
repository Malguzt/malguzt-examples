const drawInput = (name) => {
  const div = document.createElement('div');
  const input = document.createElement('input');
  input.type = "text";
  input.placeholder = name;
  input.addEventListener('keypress', (event) => {
    saveUserData(name, event.currentTarget.value);
  })

  div.appendChild(input);

  return div;
}

const drawP = (name, value) => {
  const p = document.createElement('p');
  p.appendChild(document.createTextNode(`${name}: ${value}`));

  p.addEventListener('click', (event) => {
    const element = event.currentTarget;
    element.parentNode.replaceChild(drawInput(name), element);
  })

  return p;
}

const showAttribute = (name, value) => {
  const userData = document.getElementById('userData');

  if (value === undefined || value === null) {
    userData.appendChild(drawInput(name));
  } else {
    userData.appendChild(drawP(name, value));
  }
}

const showUser = (user) => {
  Object.keys(user).forEach(attribute => {
    if(attribute !== 'uid') {
      showAttribute(attribute, user[attribute]);
    }
  });

  const link = document.createElement('a');
  link.href = '#';
  link.onclick = () => {
    firebase.auth().signOut()
  };
  link.appendChild(document.createTextNode('Cerrar sesion'));

  const userData = document.getElementById('userData');
  userData.appendChild(link);

}