import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const body = JSON.parse(req.body);
    console.log("body", body);

    try {
        const stripe = new Stripe('sk_test_51L6H1fDMm2ApmieUs6wUI8OxjIaJQxFNjM4rqRfyaDtCJhcyNdeOYLUlmll4CmRYxbKyfPHXWLMOB0QufqsPI9io005tujdvhV',
            { apiVersion: '2020-08-27', });

        const session = await stripe.checkout.sessions.create({
            // payment_method_types: ['card'],
            mode: 'payment',
            locale: 'es',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
            line_items: body,
            shipping_address_collection: {
                allowed_countries: ['ES'],
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 300,
                            currency: 'eur',
                        },
                        display_name: 'Envío standard',
                    }
                },

            ],
            
        });

        res.status(200).json({ session });

    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({ error });
    }
}
