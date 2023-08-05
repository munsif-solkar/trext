require('dotenv').config()

const mongo = require('mongodb');

const uri = process.enc.MONGODB_URI;
const dbname = "texttrack"

let isConnected;
//to assign database
let db;
//to assign collection
let coll = {};
async function connect(){
        const client = new mongo.MongoClient(uri,{useNewUrlParser:true,useUnifiedTopology:true});
        try{
                await client.connect();
		isConnected = true;
                var db = client.db(dbname);
                coll.text_data =  db.collection('text_data');
		coll.users = db.collection('users');
		coll.authentication = db.collection('authentication');
                console.log("Connection to database successfull");
        }
        catch(err){
                console.log(err);
        }
}
function getCollection(){
	return coll;
}
function connected(){
	return isConnected;
}

//export
module.exports = {
                  'connectDatabase':connect,
		  'getCollection':getCollection,
		  'connected':connected
		}
