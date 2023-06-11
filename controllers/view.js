const dbMethods = require('../lib/dbMethods');
const formatText = require('../lib/formatText');
const ft = new formatText();

function checkOwner(data,sess){
	var request_logged = sess.logged;
	var request_login_id = sess.login_id;
	if(request_logged){
		if(request_login_id == sess.login_id){
			data.owner = true;
			return data;
		}
	}
	data.owner = false;
	return data;
}

function view(req,res,collection){
	  const dbc = new dbMethods(req,collection);
          const sess = req.session;
          dbc.fetchByUrl(formatDate=true).then(function(fetchedData){
              if(dbc.exists()){
                  data = fetchedData;
                  if(dbc.url_query=='howtouse'){
		    data.owner = false;
                    res.render('view_text',data);
                    return;
                  }
                  const purify = ft.purify(data.text_body);
                  data.text_body = ft.applyAll(purify);
		  data.meta_information = ft.formatHashtags(data.meta_information);
		  data = checkOwner(data,sess);
                  res.render('view_text',data);
              }
		else{
			res.redirect('/');
		}
	 })
}

module.exports = view;
