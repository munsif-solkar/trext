const create = async (req,res,collection=null)=>{
	const sess = req.session;
	query={
                'error':0,
                'text_title':"",
                'text_body':"",
                'custom_url':"",
                'mode':'create',
                'meta-information':"",
                'description':'',
                'tags':[]
        }
	if(sess.logged){
		query.logged = true;
		query.login_id = sess.login_id;
	}
        res.render('home',query);
}
module.exports = create;
