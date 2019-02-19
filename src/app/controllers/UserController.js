const { User } = require('../models')

class UserController {
  createNew (req, res) {
    return res.render('auth/signup')
  }

  async save (req, res) {
    const { filename } = req.file

    await User.create({ ...req.body, avatar: filename })

    return res.redirect('/')
  }
}

module.exports = new UserController()
