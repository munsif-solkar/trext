const exp = require("express");
const mongo = require("mongodb");
const bodyParser = require("body-parser");
const path = require("path");
const textFormat = require('./lib/formatText');

const app = exp()

//STATIC FILES SETUP
app.use('/public',exp.static('public'));

//VIEW ENGINE
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

//FORM DATA SETUP
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

//TEXT FORMAT
const tf = new textFormat();

//DATABASE INTREGATION
let db;
let collection;
async function connectDatabase(uri,dbname){
	const client = new mongo.MongoClient(uri,{useNewUrlParser:true,useUnifiedTopology:true});
	try{
		await client.connect();
		db = client.db(dbname);
		console.log("Connection to database successfull");
	}
	catch(err){
		console.log(err);
	}
}
const uri = "mongodb+srv://Munsif:wasteinocean@cropchop.x60cw.mongodb.net/?retryWrites=true&w=majority";
const dbname = "texttrack";

//dbclient
class dbClient{
        constructor(url_query){
                this.url_query = url_query.params.x;
                this.fetched_data;
        }
        async fetchAll(formatDate=false){
                this.fetched_data = await collection.find({'custom_url':this.url_query}).toArray();
                if(formatDate && this.fetched_data.length > 0){
                        const e = this.fetched_data[0]['date'];
                        this.fetched_data[0]['date'] = `${e.getDate()}/${e.getMonth()+1}/${e.getFullYear()} ${e.getHours()}:${e.getMinutes()}`;
                }
                return this.fetched_data[0];
        }
        exists(){
                if(this.fetched_data.length > 0){
                        return true;
                }else{
                        return false;
                }
        }
        edit_mode(error=0,setEditMode={}){                                                                                                                                              setEditMode['edit_code'] = '';
                setEditMode['mode'] = 'edit';
                setEditMode['error'] = error;
                return setEditMode;
        }
        async update(updatedData){
                await collection.updateOne({'custom_url':this.url_query},{$set:updatedData});
        }
}


//ROUTES
app.get('/',function(req,res){
	query={
		'error':0,
		'text_title':"",
		'text_body':"",
		'edit_code':"",
		'custom_url':"",
		'mode':'create'
	}
	res.render('home',query);
})


function verifyEntries(e){
	//text header
	th = e.text_header.trim();
	th = (th.length <=  40);
	//text body
	tb = e.text_body.trim();
	tb = (tb && tb.length <= 2000);
	//edit code
	ec = e.edit_code.replace(" ", "").trim();
	ec = (ec && ec.length <= 9 && ec.length >= 5);
	//custom url
	cu = e.custom_url;
	var raw_cu = cu
	cu = cu.replace(/[^a-zA-Z0-9]/g,'').trim();
	if(raw_cu != cu){cu=''};
	cu = (cu && cu.length <= 20 && cu.length >= 5);
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
app.post('/',async function(req,res){
	const fdata = req.body;
	var text_header = fdata.text_header;
	var text_body = fdata.text_body;
	var edit_code = fdata.edit_code.replace(" ","");
	var custom_url = fdata.custom_url.replace(" ","");
	try{
		verifyEntries(fdata);
		let date = new Date();
		//check url existence
		const url_available = await collection.find({'custom_url':custom_url}).toArray();
		if(url_available.length > 0){
		    throw "URL not available!";
		}
		await collection.insertOne({
					'text_header':text_header,
					'text_body':text_body,
					'edit_code':edit_code,
					'custom_url':custom_url,
					'date':date
				});
		console.log("successfully added data");
		res.redirect("/"+custom_url);
	}
	catch(err){
		console.log(err);
		var error_message = err;
		fdata['error'] = error_message;
		fdata['mode'] = 'create';
		console.log(fdata);
		res.render('home',fdata);
	}
})


//view page
app.get('/:x',async (req,res)=>{
	const dbc = new dbClient(req);
	dbc.fetchAll(formatDate=true).then(function(fetchedData){
	  if(dbc.exists()){
	      data = fetchedData;
	      if(dbc.url_query=='howtouse'){
		res.render('view_text',data);
		return;
	      }
	      const purify = tf.purify(data.text_body);
	      data.text_body = tf.applyAll(purify);
	      res.render('view_text',data);
	  }else{
	      res.send("Nothing found here!!");
	  }
	});
})

var admin = true;
//edit
app.get("/edit/:x",async (req,res)=>{
	console.log(req.hostname);
	const dbc = new dbClient(req);
	dbc.fetchAll().then(function(fetched_data){
		if(dbc.exists()){
                    data = dbc.edit_mode(error=0,setEditMode=fetched_data);
		    if(dbc.url_query=='howtouse' && !admin){
			data['text_body'] = "Dude you can't edit this.";
			data['edit_code'] = "hehehehe";
		    }
		    console.log(data);
                    res.render('home',data);
        	}else{
		    res.send("nothing found here!!!!");
		}
	});
})
//SAVING EDITED DATA
function verify_code(code,codex){
	if(code != codex){
		throw "incorrect edit code!";
	}
}

app.post('/edit/:x',(req,res)=>{
	const new_data = req.body;
	console.log(new_data);
	const dbc = new dbClient(req);
	if(dbc.url_query == 'howtouse' && !admin){
		res.redirect('/'+dbc.url_query);
		return;
	}
	dbc.fetchAll().then(function(fetched_data){
		if(dbc.exists()){
			const date = fetched_data.date;
			try{
				verify_code(new_data.edit_code,fetched_data.edit_code);
				verifyEntries(new_data);
				new_data['date'] = date;
				dbc.update(new_data);
				res.redirect('/'+new_data.custom_url);
			}
			catch(err){
				new_data['custom_url'] = fetched_data.custom_url;
				data = dbc.edit_mode(error=err,new_data)
				res.render('home',data);
			}
		}else{
			res.json({"error":"Invalid request path."});
		}
	})
})


//START SERVER ON SUCCESSFULL DATABASE CONNECTION;
connectDatabase(uri,dbname).then(function(){
        collection = db.collection("text_data");
	console.log("Starting server");
	var server = app.listen(5500, function(err) {
  		if(err){console.log(err)};
		var port = server.address().port;
   		console.log("Listening on port %s", port);

	})
});
