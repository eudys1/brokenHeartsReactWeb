import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe';

export default async function ProductListStripe(req: NextApiRequest, res: NextApiResponse) {

    try {

        const stripe = new Stripe('sk_test_51L6H1fDMm2ApmieUs6wUI8OxjIaJQxFNjM4rqRfyaDtCJhcyNdeOYLUlmll4CmRYxbKyfPHXWLMOB0QufqsPI9io005tujdvhV',
            { apiVersion: '2020-08-27', });

        const transactions = await stripe.issuing.transactions.list();

        res.status(200).json({ transactions });

    } catch (error) {
        console.log("error", error);

    }


}
