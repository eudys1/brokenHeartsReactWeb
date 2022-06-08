import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe';

export default async function ProductListStripe(req: NextApiRequest, res: NextApiResponse) {
    // const stripe = require('stripe')('sk_test_51L6H1fDMm2ApmieUs6wUI8OxjIaJQxFNjM4rqRfyaDtCJhcyNdeOYLUlmll4CmRYxbKyfPHXWLMOB0QufqsPI9io005tujdvhV');
    
    try {
        // const body = JSON.parse(req.body);
        
        const stripe = new Stripe('sk_test_51L6H1fDMm2ApmieUs6wUI8OxjIaJQxFNjM4rqRfyaDtCJhcyNdeOYLUlmll4CmRYxbKyfPHXWLMOB0QufqsPI9io005tujdvhV',{apiVersion:'2020-08-27',});
        const products = await stripe.products.list({ limit: 3, });
        // console.log("eeee", products);
        
        res.status(200).json({ products});
        // console.log("productsss", products.data);
        
    } catch (error) {
        console.log("error", error);

    }


    // return products;
}