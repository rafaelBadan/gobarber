const { User } = require('../models')
const { Op } = require('sequelize')

class DashboardController {
  async index (req, res) {
    const providers = await User.findAll({
      where: {
        provider: true,
        id: { [Op.notIn]: [req.session.user.id] }
      }
    })

    return res.render('dashboard', { providers })
  }
}

module.exports = new DashboardController()
