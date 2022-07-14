const Signup = require('../../pageobjects/signup');

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

const randomDni = () => {
  let dni = Math.floor(Math.random() * 99999999);
  return dni;
};

const randomDate = () => {
  let day = Math.floor(Math.random() * 30 + 1);
  let month = Math.floor(Math.random() * 12 + 1);
  let year = Math.floor(Math.random() * 99 + 1900);
  let date = day + '/' + month + '/' + year;
  let dateS = date.toString();
  return dateS;
};

beforeAll('Open Browser', () => {
  browser.url('https://franco-trackgenix-app.vercel.app/signup');
});

describe('Complete the signup inputs with valid data', () => {
  it('Edit an admin success', async () => {
    await Signup.signup(name, lastname, randomDate(), randomDni(), randomEmail(), 'test1234');
  });
});
