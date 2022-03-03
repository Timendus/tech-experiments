const crypto = require('./crypto-helper');
const server = require('./fetch-helper');
const webauthn = require('./webauthn-helper');

let keyStore = null;
let dataStore = null;

document.addEventListener('DOMContentLoaded', async () => {

  async function login(key) {
    keyStore = key;
    try {
      const data = await server.get('http://localhost:9001/data/1');
      try {
        dataStore = JSON.parse(crypto.decrypt({ key, ciphertext: data }));
      } catch(e) {
        return alert("Can't decrypt data with that key");
      }
    } catch(e) {
      dataStore = { patient: {} };
    }

    document.getElementById('overlay').style.display = 'none';
    document.getElementById('patient-name').value = dataStore?.patient?.name || '';
    document.getElementById('patient-history').value = dataStore?.patient?.history || '';
  }

  document.getElementById('login-token').addEventListener('click', async () => {
    const key = await webauthn.validateToken();
    login(key);
  });

  document.getElementById('login-password').addEventListener('click', () => {
    login(prompt("What's the password?"));
  });

  document.getElementById('registrator').addEventListener('click', () => webauthn.registerToken());

  document.getElementById('save').addEventListener('click', async e => {
    dataStore.patient.name = document.getElementById('patient-name').value;
    dataStore.patient.history = document.getElementById('patient-history').value;

    try {
      await server.put('http://localhost:9001/data/1',
        crypto.encrypt({ key: keyStore, message: JSON.stringify(dataStore) }));
    } catch(e) {
      return console.error(e);
    }

    e.target.style.backgroundColor = 'green';
    setTimeout(() => e.target.style.backgroundColor = null, 1000);
  });

});
