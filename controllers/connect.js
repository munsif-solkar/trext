function connect(req,res){
	var data = {error:''}
	res.render('connect',data);
}
module.exports = connect;
