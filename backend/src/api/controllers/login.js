import User from '../models/User.js'
import { generateToken } from '../../utils/auth.js'

export const login = async (req, res) => {
  try {
    const email = req.body.email.toLowerCase()
    const password = req.body.password

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
      return res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      return res.status(401).send({ error: 'Invalid credentials' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
