const formatText = require('../../lib/formatText');
const dbMethods = require('../../lib/dbMethods');


var ft = new formatText();


function checkField(object,field){
	var exists = Object.keys(object).includes(field);
	return exists
}
async function explore(req,res,collection){
	var data = [];
	var tag = ""
	const dbc = new dbMethods(req,collection,find='query');
	await dbc.fetchByTag().then(fetched_data=>{
		tag = dbc.resultsBy;
		if(dbc.exists()){
			data = fetched_data;
			console.log(data);
		}
	})
	const display_data = [];
	data.map(function(object){
	    if(checkField(object,'description') && checkField(object,'tags')){
		if(object.tags.length > 0){
			var date = object['date'];
			date = dbc.format_date(date);
			object['date'] = date;
			object.meta_information = ft.formatHashtags(ft.purify(object.meta_information));
			display_data.push(object)
		}
            }
	})
	res.render('explore',{'data':display_data,'resultsBy':tag});
}

module.exports=explore;
