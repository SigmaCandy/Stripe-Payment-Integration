const express = require('express');
const router = express.Router();
const stripe = require('../config/stripe');

// Create a Payment Intent
router.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency } = req.body; // e.g., amount in cents
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: ['card'],
        });
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
