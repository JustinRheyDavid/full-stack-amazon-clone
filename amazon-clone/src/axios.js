import axios from "axios";

// The "api" Cloud Function (functions/index.js) is deployed at:
//   https://us-central1-challenge-f483a.cloudfunctions.net/api/
// Point at the local emulator during dev instead; run it with:
//   cd functions && npm run serve
const baseURL = window.location.hostname === 'localhost'
    ? 'http://127.0.0.1:5001/challenge-f483a/us-central1/api/'
    : 'https://us-central1-challenge-f483a.cloudfunctions.net/api/';

const instance = axios.create({ baseURL });

export default instance;


