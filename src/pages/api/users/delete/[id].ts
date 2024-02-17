import User from 'src/models/user.model'

export default async function handler(req: any, res: any) {
  // Handle the API request and response

  if (req.method === 'GET') {
    const data = { message: 'This is a GET request' }
    res.status(200).json(data)
  } else if (req.method === 'DELETE') {
    const { id } = req.query
    console.log(id)
    try {
      await User.deleteOne({ _id: id })
      res.status(200).json({
        status: true
      })
    } catch (err) {
      console.log(err)
      res.status(200).json({
        status: false
      })
    }
  }
}
