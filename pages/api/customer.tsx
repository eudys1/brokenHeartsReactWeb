import type { NextApiRequest, NextApiResponse } from 'next'

export default async function ProductListStripe(req: NextApiRequest, res: NextApiResponse) {

    try {

        const stripe = require('stripe')('sk_test_51L6H1fDMm2ApmieUs6wUI8OxjIaJQxFNjM4rqRfyaDtCJhcyNdeOYLUlmll4CmRYxbKyfPHXWLMOB0QufqsPI9io005tujdvhV');

        const transactions = await stripe.issuing.transactions.list();

        res.status(200).json({ transactions });

    } catch (error) {
        console.log("error", error);

    }


}
