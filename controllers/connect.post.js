const dbc = require('../lib/dbMethods');
const data_error = {error:'Please provide valid Login Id'}
async function connect_post(req,res,collection){
	const sess = req.session;
	var login_id;
	try{
	    const form_data = req.body;
	    login_id = form_data.login_id;
	}
	catch(err){
	    res.redirect('/connect');
		return;
	}
	console.log('Login id: '+login_id)
	const users_dbc = new dbc(null,collection);
	const user = await users_dbc.getBy('user_id',login_id);
	if(user.length < 1){
		res.render('connect',data_error);
		return;
	}
	sess.login_id = login_id;
	sess.logged = true;
	console.log(sess);
	res.send(user);
}

module.exports = connect_post;

