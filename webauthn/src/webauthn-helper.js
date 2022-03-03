const username = "starfishy";
const challenge =  stringToArrayBuffer("abcdefgh");
const timeout = 60 * 4 * 1000;

function stringToArrayBuffer(str) {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}

function stringToArrayBuffer(str) {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}

function decodeBase64(base64) {
  return Uint8Array.from(JSON.parse(base64));
}

function encodeBase64(buffer) {
  JSON.stringify(buffer);
}

function decodeBase64(baseurl64String) {
  // Base64url to Base64
  const padding = "==".slice(0, (4 - (baseurl64String.length % 4)) % 4);
  const base64String =
    baseurl64String.replace(/-/g, "+").replace(/_/g, "/") + padding;

  // Base64 to binary string
  const str = atob(base64String);

  // Binary string to buffer
  const buffer = new ArrayBuffer(str.length);
  const byteView = new Uint8Array(buffer);
  for (let i = 0; i < str.length; i++) {
    byteView[i] = str.charCodeAt(i);
  }
  return buffer;
}

function encodeBase64(buffer) {
  // Buffer to binary string
  const byteView = new Uint8Array(buffer);
  let str = "";
  for (const charCode of byteView) {
    str += String.fromCharCode(charCode);
  }

  // Binary string to base64
  const base64String = btoa(str);

  // Base64 to base64url
  // We assume that the base64url string is well-formed.
  const base64urlString = base64String
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
  return base64urlString;
}

async function registerToken() {
  const registerResult = await window.navigator.credentials.create({
    publicKey: {
      rp: {
        id: window.location.hostname,
        name: window.location.hostname
      },
      user: {
        displayName: username,
        id: stringToArrayBuffer(username),
        name: username,
      },
      challenge: challenge,
      pubKeyCredParams: [
        { type: "public-key", alg: -7 },
        { type: "public-key", alg: -257 },
      ],
      timeout: timeout,
      attestation: "direct",
      extensions: {
        hmacCreateSecret: true
      }
    },
  });
  document.getElementById('credential').value = encodeBase64(registerResult.rawId);
}

async function validateToken() {
  const credential = document.getElementById('credential').value || 'ATXNpdkpj35TaN0pYCCMP97PspKAxIP4Y_vAqlDJEUdKFFxwlTfNGzSgkOhMqRa0Fo5uKoY0EsgU6D4-Kw';
  const base64credential = decodeBase64(credential);
  const validateResult = await window.navigator.credentials.get({
    publicKey: {
      challenge: challenge,
      timeout: timeout,
      allowCredentials: [{
        type: 'public-key',
        id: base64credential
      }],
      extensions: {
        hmacGetSecret: {
          salt1: 'dg78967h8723y4jh3g5k'
        }
      }
    }
  });
  if(validateResult.id == credential) {
    document.getElementById('validator').classList.add('green');
    document.getElementById('validator').classList.remove('red');
  } else {
    document.getElementById('validator').classList.add('red');
    document.getElementById('validator').classList.remove('green');
  }
  return validateResult.id;
}

module.exports = {
  registerToken, validateToken
};
