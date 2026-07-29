require('dotenv').config();

const functions = require('firebase-functions');
const express = require('express');

const cors = require('cors');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

//API

//App config

const app = express();

//Middlewares
app.use(cors({origin : true}));
app.use(express.json());

//API routes
app.get('/', (request, response) => response.status(200).send('hello world'))

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;

    console.log('Payment Request Recieved for this amount >>> ', total)

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: 'usd',
        });
        response.status(201).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Stripe paymentIntent creation failed >>> ', error.message);
        response.status(400).send({ error: error.message });
    }
})


//Listen command
exports.api = functions.https.onRequest(app)


//example endpoint`
//(http://127.0.0.1:5001/challenge-f483a/us-central1/api