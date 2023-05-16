const create = async (req,res,collection=null)=>{
	query={
                'error':0,
                'text_title':"",
                'text_body':"",
		'edit_code':"",
                'custom_url':"",
                'mode':'create',
                'meta-information':"",
                'description':'',
                'tags':[]
        }
        res.render('home',query);
}
module.exports = create;
