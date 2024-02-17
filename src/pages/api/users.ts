import User from './models/user.model'

export default async function handler(req: any, res: any) {
  // Handle the API request and response

  if (req.method === 'GET') {
    const data = { message: 'This is a GET request' }
    res.status(200).json(data)
  } else if (req.method === 'POST') {
    try {
      const exist_users = await User.find({
        $or: [{ username: req.body.username, billing_email: req.body.billing_email }]
      })
      if (exist_users.length > 0) {
        res.status(405).json({
          status: false,
          message: 'User already exists that have the same username or email.'
        })
      }
      const user = await User.create(req.body)
      res.status(200).json({
        status: true,
        user: user
      })
    } catch (err) {
      console.log(err)
      res.status(401).json({
        status: false,
        message: 'Creating a new user is failed.'
      })
    }
  }
}
