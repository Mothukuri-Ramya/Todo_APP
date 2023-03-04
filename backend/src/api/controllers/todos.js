import Todo from '../models/Todo.js'

export const getTodos = async (req, res) => {
  console.log("req: ", req.user)
  try {
    const objects = await Todo.find({ user: req.user.id })
      .lean()
      .populate('user', ['name', 'email'])
    res.send(objects)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getTodo = async (req, res) => {
  try {
    const objects = await Todo.findOne({
      user: req.user.id,
      _id: req.params.id,
    })
      .lean()
      .populate('user', ['name', 'email'])
    res.send(objects)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const createTodo = async (req, res) => {
  try {
    console.log("req: ", req.body);
    console.log("req: ", req.user);
    const { title, description, eventDate } = req.body

    const object = await Todo.create({
      title,
      description,
      eventDate,
      user: req?.user?._id,
    })

    res.status(200).send(object)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, eventDate } = req.body

    const object = await Todo.findById(id)
    if (!object) return res.status(400).json({ error: `Todo not found` })

    object.title = title
    object.description = description
    object.eventDate = eventDate

    await object.save()

    res.status(200).json({ message: `Todo updated` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params
    const object = await Todo.findById(id)

    if (!object) return res.status(400).json({ error: `Todo not found` })

    await object.remove()
    res.status(200).json({ message: `Todo removed` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
