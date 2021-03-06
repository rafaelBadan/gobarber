const { User } = require('../models')

class SessionController {
  async create (req, res) {
    return res.render('auth/signin')
  }

  async signin (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      req.flash('error', 'Usuário não encontrado')
      return res.redirect('/')
    }

    if (!(await user.checkPassword(password))) {
      req.flash('error', 'senha incorreta')
      return res.redirect('/')
    }

    req.session.user = user
    console.log('USER:', req.session.user)
    return res.redirect('/app/dashboard')
  }

  destroy (req, res) {
    req.session.destroy(() => {
      res.clearCookie('root')
      return res.redirect('/')
    })
  }
}

module.exports = new SessionController()
