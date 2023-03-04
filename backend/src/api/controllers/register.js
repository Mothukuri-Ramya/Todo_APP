import { generateToken } from '../../utils/auth.js'
import User from '../models/User.js'

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const object = await User.create({ name, email, password })

    object.password = await object.encryptPassword(password)
    await object.save()

    res.status(200).send({
      _id: object._id,
      name: object.name,
      email: object.email,
      token: generateToken(object._id),
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
