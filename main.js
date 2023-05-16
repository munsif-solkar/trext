const exp = require("express");
const {connectDatabase,getCollection} = require('./lib/dbIntegration');
const bodyParser = require("body-parser");
const path = require("path");
//controller
const routes = require('./controllers/routes');

const app = exp()

//STATIC FILES SETUP
app.use('/public',exp.static('public'));

//VIEW ENGINE
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

//FORM DATA SETUP
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

//DATABASE INTREGATION
let db;
let collection;

//ROUTES

//explore tab
app.get('/explore',function(req,res){
	routes.explore(req,res,collection);
});

app.get('/',function(req,res){
	routes.create(req,res,collection);
})

//create post
app.post('/',function(req,res){
	routes.create_post(req,res,collection);
})

//view page
app.get('/:page_path',(req,res)=>{
	routes.view(req,res,collection);
})

//edit
app.get("/edit/:page_path",async (req,res)=>{
	routes.edit(req,res,collection);
})

//SAVING EDITED DATA
app.post('/edit/:page_path',(req,res)=>{
	routes.edit_post(req,res,collection);
})



//START SERVER ON SUCCESSFULL DATABASE CONNECTION;
connectDatabase().then(function(){
        collection = getCollection();
	console.log("Starting server");
	var server = app.listen(5500, function(err) {
  		if(err){console.log(err)};
		var port = server.address().port;
   		console.log("Listening on port %s", port);

	})
});
