const exp = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = exp()
//STATIC FILES SETUP
app.use('/public',exp.static('public'));

//VIEW ENGINE
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

//FORM DATA SETUP
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


//ROUTES
app.get('/',function(req,res){
	query={
		'error':0,
		'text_title':"",
		'text_body':"",
		'edit_code':"",
		'custom_url':""
	}
	res.render('home',query);
})


function verifyEntries(th,tb,ec,cu){
	//text header
	th = th.trim();
	th = (th && th.length <=  20);
	//text body
	tb = tb.trim();
	tb = (tb && tb.length <= 900);
	//edit code
	ec = ec.replace(" ", "").trim();
	ec = (ec && ec.length <= 9);
	//custom url
	cu = cu.replace(/[^a-zA-Z0/9]/g,'').trim();
	cu = (cu && cu.length <= 9);
	if(!th){
		throw "Please check your Title Field it must contain minimum of 1 character and max 20 characters are allowed.";
	}
	else if(!tb){
		throw "The textbox must contain minimun 10 characters and maximum of 900";
	}
	else if(!ec){
		throw "Invalid or empty 'Edit code'";
	}
	else if(!cu){
		throw "Invalid or empty 'custom url'";
	}
	else{
		return true;
	}
}
app.post('/',function(req,res){
	const fdata = req.body;
	var text_header = fdata.text_header;
	var text_body = fdata.text_body;
	var edit_code = fdata.edit_code.replace(" ","");
	var custom_url = fdata.custom_url.replace(" ","");
	try{
		verifyEntries(text_header,text_body,edit_code,custom_url);
		res.send("success");
	}
	catch(err){
		console.log(err);
		var error_message = "Error: "+err;
		var onError = {
			'error':error_message,
			'text_title':text_header,
			'text_body':text_body,
			'edit_code':edit_code,
			'custom_url':custom_url
		};
		res.render('home',onError);
	}
})

var server = app.listen(5500, function() {
   var host = server.address().address;
   var port = server.address().port;
   console.log("Listening on port %s", port)
})
