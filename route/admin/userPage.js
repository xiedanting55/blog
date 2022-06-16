const {User} = require("../../model/user");

module.exports = async (req, res) => {
    let users = await User.find({})
    res.render('admin/user', {
        users: users
    })
}