const randomName = () => {
  let names = [
    'Matias',
    'Higinia',
    'Tobias',
    'Maria',
    'Laura',
    'Guido',
    'Andres',
    'Franco',
    'Alejandro',
    'Carla',
    'Martin',
    'Axel',
    'Paloma',
    'Martin',
    'Juan',
    'Diego',
    'UnQa',
    'Test'
  ];
  let randomName = names[Math.floor(Math.random() * names.length)];
  return randomName;
};

const randomLastName = () => {
  let lastnames = [
    'Vadala',
    'Medica',
    'Pujol',
    'Brussa',
    'Cerioni',
    'Geary',
    'Martini',
    'Santini',
    'Vigil',
    'LoTufo',
    'Fiol',
    'Quiroz',
    'Perez',
    'Castro',
    'Gomez',
    'Godoy',
    'Cazeneuve',
    'Testing'
  ];
  let randomName = lastnames[Math.floor(Math.random() * lastnames.length)];
  return randomName;
};

const randomNumber = () => {
  let number = Math.floor(Math.random() * 999 + 1);
  return number;
};

const name = randomName();
const lastname = randomLastName();

const randomEmail = () => {
  let email = `${name}${lastname}${randomNumber()}@gmail.com`;
  let emailRandom = email.toString();
  return emailRandom;
};

const randomDate = () => {
  let maxDate = Date.now();
  let timestamp = Math.floor(Math.random() * maxDate);
  let makeADate = () => {
    return new Date(timestamp);
  };
  let fdate = makeADate();
  fdate.setFullYear(Math.floor(Math.random() * 38 + 1960));
  fdate.setDate(Math.floor(Math.random() * 20 + 10));
  fdate.setMonth(11);
  return fdate;
};

const date = randomDate();
const yearDate = date.getFullYear();
const dateToReturn = date.toLocaleDateString();

const randomDni = () => {
  let dni = 0;
  if (yearDate >= 1994) {
    dni = Math.round(Math.random() * 2999999 + 40000000);
  } else if (yearDate >= 1990) {
    dni = Math.round(Math.random() * 999999 + 39000000);
  } else if (yearDate >= 1985) {
    dni = Math.round(Math.random() * 4999999 + 35000000);
  } else if (yearDate >= 1980) {
    dni = Math.round(Math.random() * 4999999 + 30000000);
  } else if (yearDate >= 1975) {
    dni = Math.round(Math.random() * 4999999 + 25000000);
  } else if (yearDate >= 1970) {
    dni = Math.round(Math.random() * 4999999 + 20000000);
  } else if (yearDate >= 1965) {
    dni = Math.round(Math.random() * 4999999 + 15000000);
  } else {
    dni = Math.round(Math.random() * 4999999 + 10000000);
  }
  return dni;
};

module.exports = { name, lastname, randomEmail, randomDni, dateToReturn, randomNumber };
