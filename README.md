# full-stack-amazon-clone

A full-stack Amazon clone built with React and Firebase, with a working Stripe checkout.

**Live app:** https://challenge-f483a.web.app

## Features

- Browse products on the home page
- Add/remove items from the basket
- Google sign-in (Firebase Auth)
- Stripe-powered checkout with a Cloud Functions payment backend
- Order history synced from Firestore in real time

## Tech stack

- **Frontend:** React 19, React Router, Context/reducer for state, MUI icons, Stripe.js
- **Backend:** Firebase Cloud Functions (Express + Stripe SDK)
- **Data/Auth:** Firebase Auth, Firestore
- **Hosting:** Firebase Hosting

## Project structure

```
amazon-clone/   React frontend (Create React App)
functions/      Firebase Cloud Functions backend (Stripe payment intent API)
firebase.json   Hosting + Functions deploy config
.firebaserc     Firebase project alias (challenge-f483a)
```

## Local development

### Frontend

```
cd amazon-clone
npm install
npm start
```

Runs at http://localhost:3001 (see `amazon-clone/package.json`/`.env` for the port).

### Backend (Functions emulator)

The frontend calls the local emulator automatically when running on `localhost` (see `amazon-clone/src/axios.js`).

```
cd functions
npm install
cp .env.example .env   # then fill in your own Stripe test secret key
npm run serve
```

## Deployment

```
firebase deploy --only hosting     # deploy the React app
firebase deploy --only functions   # deploy the Stripe payment API
```

Requires the Firebase project to be on the Blaze (pay-as-you-go) plan to deploy Cloud Functions, and a `STRIPE_SECRET_KEY` set in `functions/.env` before deploying.
