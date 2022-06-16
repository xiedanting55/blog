const Joi = require('joi');
const {User, validateUser} = require("../../model/user");
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    try{
        await validateUser(req.body); 
    }catch(err){
        // res.redirect(`/admin/user-edit?message=${err.message}`)
		return next(JSON.stringify({path: '/admin/user-edit', message: err.message}))
    }

    let user = await User.findOne({email: req.body.email});
    if (user) {
		// return res.redirect(`/admin/user-edit?message=邮箱地址已经被占用`);
		return next(JSON.stringify({path: '/admin/user-edit', message: '邮箱地址已经被占用'}))
	}
	const salt = await bcrypt.genSalt(10);
	const password = await bcrypt.hash(req.body.password, salt);
	req.body.password = password;
	await User.create(req.body);
	res.redirect('/admin/user');
}