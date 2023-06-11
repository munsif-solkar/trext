const dbMethods = require('../lib/dbMethods');
const verifyEntries = require('../lib/verifyEntries');
const splitMetaInformation = require('../lib/splitMetaInformation');
const checkFields = require('../lib/checkFields');
const checkOwner = require('../lib/checkOwner');

function edit_post(req,res,collection){
	const new_data = req.body;
	const sess = req.session;
	if(!checkFields(new_data)){
		res.send('Invalid data');
		return;
	}
	if(!sess.logged){
		res.send('You are not logged in');
		return;
	}
	//console.log(Object.keys(new_data));
        const dbc = new dbMethods(req,collection);
        if(dbc.url_query == 'howtouse' && !admin){
                res.redirect('/'+dbc.url_query);
                return;
        }
        dbc.fetchByUrl().then(function(fetched_data){
                if(dbc.exists()){
                        const date = fetched_data.date;
                        try{
                                if(!checkOwner(fetched_data,sess).owner){
					res.redirect('/'+fetched_data.custom_url);
					return;
				}
                                var meta_info = new_data.meta_information;
                                new_data.description = splitMetaInformation(meta_info,filter='description');
                                new_data.tags = splitMetaInformation(meta_info,filter='tags');
                                verifyEntries(new_data);
                                new_data.date = date;
                                dbc.update(new_data);
                                res.redirect('/'+new_data.custom_url);
                        }
			catch(err){
                                new_data.custom_url = fetched_data.custom_url;
                                data = dbc.edit_mode(error=err,new_data)
                                res.render('home',data);
                        }
                }else{
                        res.json({"error":"Invalid request path."});
                }
        })

}


module.exports = edit_post;
