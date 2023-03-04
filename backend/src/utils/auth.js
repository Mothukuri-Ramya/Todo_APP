import jwt from 'jsonwebtoken'
import User from '../api/models/User.js'

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  })
}

export const isAuth = async (req, res, next) => {
  let token

  console.log("incoming request");

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')

      if (req.user) return next()

      return res
        .status(403)
        .send({ error: 'You do not have permission to access this route' })
    } catch (error) {
      res.status(401).json({ error: 'Unauthorized' })
    }
  }
  if (!token) {
    res.status(401).json({ error: 'Not authorized, no token provided' })
  }
}
