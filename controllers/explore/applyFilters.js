const filters = ['sort','limit'];

function sort(sortBy,data){
	if(sortBy=='latest_to_oldest'){
		data = data.reverse();
		return data;
	}else{
		return data;
	}
}
function limit(limit,data){
	var dataLen = data.length;
	try{
		limit = parseInt(limit);
	}
	catch(err){
		console.log(err);
		limit = dataLen;
	}
	if(limit > dataLen || limit <= 0){limit=dataLen}
	var newData = [];
	limit = limit - 1;
	for(var i=0; i <= limit; i++){
		newData.push(data[i]);
	}
	return newData;
}
function applyFilters(req,data){
	var data = data;
	var queries = req.query;
	const apply = {'sort':sort,'limit':limit};
	const keys = Object.keys(queries);
	filters.map(filter=>{
		if(keys.includes(filter)){
			data = apply[filter](queries[filter],data);
		}
	})
	return data;
}


module.exports = applyFilters;
