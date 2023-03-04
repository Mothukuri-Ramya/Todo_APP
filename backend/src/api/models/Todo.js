import mongoose from 'mongoose'

const todoScheme = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    eventDate: { type: Date },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
)

const Todo = mongoose.model('Todo', todoScheme)
export default Todo;
