require('dotenv').config()
const exp = require("express");
const session = require("express-session");
const {connectDatabase,getCollection,connected} = require('./lib/dbIntegration');
const bodyParser = require("body-parser");
const path = require("path");

const textFormat = require('./lib/formatText');
const botWorker = require('./Bot/tel')
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

//SESSION
app.use(session({
  secret: 'HRY56EHDNFU473IJDH37289??????',
  resave: false,
  saveUninitialized: false
}));


//DATABASE INTREGATION
let db;

let collection;

//BOT
let Bot;


//ROUTES

//connect
app.get('/connect',function(req,res){
	routes.connect(req,res);
});

app.post('/connect',function(req,res){
	routes.connect_post(req,res,collection.users);
});

app.get('/profile',function(req,res){
	routes.profile(req,res,collection);
});

//explore tab
app.get('/explore',function(req,res){
	routes.explore(req,res,collection.text_data);
});



app.get('/',function(req,res){
	routes.create(req,res,collection.text_data);
})

//create post
app.post('/',function(req,res){
	routes.create_post(req,res,collection.text_data,Bot);
})

//view page
app.get('/:page_path',(req,res)=>{
	routes.view(req,res,collection.text_data);
})

//edit
app.get("/edit/:page_path",async (req,res)=>{
	routes.edit(req,res,collection.text_data);
})

//SAVING EDITED DATA
app.post('/edit/:page_path',(req,res)=>{
	routes.edit_post(req,res,collection.text_data);
})

//START SERVER ON SUCCESSFULL DATABASE CONNECTION;
connectDatabase().then(function(){
        collection = getCollection()
	console.log("Starting Bot");
	const bot = new botWorker(getCollection());
	Bot = bot;
	bot.listen();
	console.log("Starting Server");
	var server = app.listen(5500, function(err) {
  		if(err){console.log(err)};
		var port = server.address().port;
   		console.log("Listening on port %s", port);

	})
});
