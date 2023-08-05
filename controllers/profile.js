const dbc = require('../lib/dbMethods');
async function profile(req,res,collection){
	const sess = req.session;
	const text_data = collection.text_data;
	const users_data = collection.users;
	const text_data_dbc = new dbc(null,text_data);
	const users_data_dbc = new dbc(null,users_data);
	console.log('profile');
	if(!sess.logged && !sess.login_id){
		res.redirect('/connect');
		return;
	}
	const user = sess.login_id;
	const data = await text_data_dbc.getBy('byUser',user);
	data.map(function(element){
		element.date = text_data_dbc.format_date(element.date);
	})
	data.reverse();
	console.log(user);
	var profile_details = await users_data_dbc.getBy('user_id',user);
        profile_details = profile_details[0];
	profile_details.date = users_data_dbc.format_date(profile_details.date);
	const telegram_data = profile_details.message_data.from;
	res.render('profile',{data:data,user:profile_details,telegram_data:telegram_data});
}

module.exports = profile;
