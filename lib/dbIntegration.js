const mongo = require('mongodb');

const uri = "mongodb+srv://Munsif:wasteinocean@cropchop.x60cw.mongodb.net/?retryWrites=true&w=majority";
const dbname = "texttrack"

//to assign database
let db;
//to assign collection
let coll;

async function connect(){
        const client = new mongo.MongoClient(uri,{useNewUrlParser:true,useUnifiedTopology:true});
        try{
                await client.connect();
                var db = client.db(dbname);
                coll = db.collection('text_data');
                console.log("Connection to database successfull");
        }
        catch(err){
                console.log(err);
        }
}
function getCollection(){
	return coll;
}

//export
module.exports = {
                  'connectDatabase':connect,
		  'getCollection':getCollection
		}
