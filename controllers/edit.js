const dbMethods = require('../lib/dbMethods');
const checkOwner = require('../lib/checkOwner');

var admin = false;
function edit(req,res,collection){
	const sess = req.session;
	const dbc = new dbMethods(req,collection);
        dbc.fetchByUrl().then(function(fetched_data){
                if(dbc.exists()){
		  console.log(fetched_data.edit_code);
                    data = dbc.edit_mode(error=0,setEditMode=fetched_data);
                    if(!checkOwner(data,sess).owner){
			res.redirect('/');
			return;
		    }
		    data.logged = sess.logged;
		    data.login_id = sess.login_id;
                    res.render('home',data);
                }else{
                    res.send("nothing found here!!!!");
                }
        });
}

module.exports = edit;
