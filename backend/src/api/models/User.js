import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userScheme = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      // validate: {
      //   validator: (v) => (v === 'ahmaat19@gmail.com' ? false : true),
      //   message: (props) => `${props.value} not allowed`,
      // },
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
)

userScheme.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// encrypt password before saving into mongoDB
userScheme.methods.encryptPassword = async function (password) {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

const User = mongoose.model('User', userScheme)
export default User
