import { NextApiRequest, NextApiResponse } from 'next';
import User from "src/models/user.model"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle the API request and response

  if(req.method === 'GET'){
    const data = { message: 'This is a GET request' };
    res.status(200).json(data);
  }else if( req.method === "POST") {
    console.log(req.body)
    try{
      const user = await User.updateOne({_id: req.body._id}, { ...req.body})
      res.status(200).json({
        status: true,
        user: user
      })
    } catch(err){
      console.log(err);
      res.status(200).json({
        status: false,
        message: "Creating a new user is failed."
      })
    }
  }
}