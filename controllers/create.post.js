const dbMethods = require('../lib/dbMethods');
const splitMetaInformation = require('../lib/splitMetaInformation');
const checkUrlAvailability = require('../lib/checkUrlAvailability');
const verifyEntries = require('../lib/verifyEntries');
async function create_post(req,res,collection){
	const dbc = new dbMethods(req,collection);
        var fdata = req.body;
        var text_header = fdata.text_header;
        var text_body = fdata.text_body;
        var edit_code = fdata.edit_code.replace(" ","");
        var custom_url = fdata.custom_url.replace(" ","");
	var meta_information = fdata.meta_information;
        var description = '';
        var tags = [];
        try{
                tags = splitMetaInformation(meta_information,filter='tags');
                description = splitMetaInformation(meta_information,filter='description');
                verifyEntries(fdata);
                let date = new Date();
                //check url existence
                await checkUrlAvailability(custom_url,collection);
                fdata = {'text_header':text_header,
                        'text_body':text_body,
                        'edit_code':edit_code,
                        'custom_url':custom_url,
                        'date':date,
                        'meta_information':meta_information,
                        'description':description,
                        'tags':tags
                }
                dbc.insert(fdata);
		console.log("successfully added data");
                res.render('save',fdata);
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
