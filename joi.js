const Joi = require("joi");

const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().error(new Error("username属性没有通过验证")),
	birth: Joi.number().min(1900).max(2020).error(new Error('birth没有通过验证'))
})

async function run () {
	try {
		// 实施验证
		await schema.validateAsync({username: 'ab', birth: 1800});
	}catch (ex) {
		console.log(ex.message);
		return;
	}
	console.log('验证通过')
	
}

run();
