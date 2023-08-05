const dbMethods = require('../lib/dbMethods');
const splitMetaInformation = require('../lib/splitMetaInformation');
const checkUrlAvailability = require('../lib/checkUrlAvailability');
const verifyEntries = require('../lib/verifyEntries');
const checkFields = require('../lib/checkFields');
const getUrl = require('../lib/getUrl');

async function create_post(req,res,collection,Bot){
	const dbc = new dbMethods(req,collection);
	var fdata = req.body;
	const sess = req.session;
	if(!sess.logged && !sess.login_id){
		res.redirect('/connect');
		return;
	}
	if(!checkFields(fdata)){
		res.send("Invalid data");
		return;
	}
        var text_header = fdata.text_header;
        var text_body = fdata.text_body;
        var custom_url = fdata.custom_url.replace(" ","");
	var meta_information = fdata.meta_information;
        var description = '';
        var tags = [];
	var byUser = sess.login_id;
        try{
                tags = splitMetaInformation(meta_information,filter='tags');
                description = splitMetaInformation(meta_information,filter='description');
                verifyEntries(fdata);
                let date = new Date();
                //check url existence
                await checkUrlAvailability(custom_url,collection);
                fdata = {'text_header':text_header,
                        'text_body':text_body,
                        'custom_url':custom_url,
                        'date':date,
                        'meta_information':meta_information,
                        'description':description,
                        'tags':tags,
			'byUser':byUser
                }
                dbc.insert(fdata);
		console.log("successfully added data");
		const botAlert = `You just created new post!\n\n<b>URL</b>\n${getUrl(req)}`;
		Bot.send(sess.telegram_id,botAlert);
                res.redirect('/'+custom_url);
        }
	catch(err){
                console.log(err);
                var error_message = err;
                fdata['error'] = error_message;
                fdata['mode'] = 'create';
                console.log(fdata);
                res.render('home',fdata);
        }
}

module.exports = create_post;
