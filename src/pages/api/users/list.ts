import User from 'src/models/user.model'

export default async function handler(req: any, res: any) {
  // Handle the API request and response

  if (req.method === 'GET') {
    const data = { message: 'This is a GET request' }
    res.status(200).json(data)
  } else if (req.method === 'POST') {
    const { q, role, status, currentPlan } = req.body.params
    try {
      const allUsers = await User.find({})
      const users = await User.find({ fullName: { $regex: q } })

      const result = {
        users: users,
        allData: allUsers,
        total: allUsers.length,
        params: {
          q,
          role,
          status,
          currentPlan
        }
      }

      res.status(200).json(result)
    } catch (err) {
      res.status(200).json([])
    }
  }
}
