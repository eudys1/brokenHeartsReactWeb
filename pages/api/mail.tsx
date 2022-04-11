import type { NextApiRequest, NextApiResponse } from 'next'


export default (req:NextApiRequest, res:NextApiResponse)=>{
    console.log(req.body);
    
    const body = JSON.parse(req.body);

    console.log(body);

    res.status(200).json({ status: 'OK'});
}