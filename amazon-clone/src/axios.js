import axios from "axios";

// Matches the "api" Cloud Function exported from functions/index.js.
// Requests 404/network-fail until that function is deployed with a
// STRIPE_SECRET_KEY secret set (see functions/index.js).
const instance = axios.create({
    baseURL: 'http://127.0.0.1:5001/challenge-f483a/us-central1/api'
});

export default instance;