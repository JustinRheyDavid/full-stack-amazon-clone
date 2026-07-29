import axios from "axios";

// Matches the "api" Cloud Function exported from functions/index.js.
// Requests 404/network-fail until that function is deployed with a
// STRIPE_SECRET_KEY secret set (see functions/index.js).
const instance = axios.create({
    baseURL: 'https://us-central1-challenge-f483a.cloudfunctions.net/api'
});

export default instance;