const formatText = require('../../lib/formatText');
var tf = new formatText();
function checkField(object,field){
	var exists = Object.keys(object).includes(field);
	return exists
}
exports.getExplorePage = async (req,res,collection)=>{
	const data = await collection.find({}).toArray();
	const display_data = [];
	data.map(function(object){
	    if(checkField(object,'description') && checkField(object,'tags')){
		if(object.tags.length > 0){
			var date = object['date'];
			date = `${date.getDate()} ${date.toLocaleString('default',{'month':'short'})} ${date.getFullYear()}`;
			object['date'] = date;
			object.meta_information = tf.formatHashtags(tf.purify(object.meta_information));
			display_data.push(object)
		}
            }
	})
	res.render('explore',{'data':display_data});
}
module.exports={
	'getExplorePage':exports.getExplorePage,
}
