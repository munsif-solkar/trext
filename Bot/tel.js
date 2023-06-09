const nb = require('node-telegram-bot-api')
const fs = require('fs');
const dbc = require('../lib/dbMethods');
const path = require('path');
const genRandom = require('../lib/genRandom');
const menu = require('./menu')
const buttons = require('./buttons');

const help = () =>{return fs.readFileSync(path.join(__dirname,'help.txt'),{encoding:'utf8',flag:'r'}).trim()};

class botWorker{
	constructor(collection){
		try{
		    const token = fs.readFileSync(path.join(__dirname,'token'),
    			    { encoding: 'utf8', flag: 'r' }).trim();
		    this.bot = new nb(token,{polling:true});
		    console.log('Bot started');
		}
		catch(err){
		    console.log(err);
		}
		this.users = collection.users;
		this.text_data = collection.text_data;
		this.users_dbc = new dbc(null,this.users);
		this.text_data_dbc = new dbc(null,this.text_data);
		this.sentMessage = '';
	}
	handleQueries(){
		const lastClicks = new Map();
		this.bot.on('callback_query',(query)=>{
			var id = query.from.id;
                        var query_data = query.data;
			this.bot.deleteMessage(query.from.id,query.message.message_id);
                        this.cases(query_data,id);
		})
	}
	listen(){
		this.bot.on('message',(message)=>{
			var message_data = message;
			var id = message.chat.id;
			var msg_text = message.text;
			this.cases(msg_text,id,message_data);
		})
		this.handleQueries();
		this.bot.on('polling_error', (error) => {
  			console.log('Polling error:', error);
		});
	}
	send(id,msg,options={parse_mode:'HTML'}){
		return this.bot.sendMessage(id,msg,options);
	}
	edit(id,response,message){
		var message_id = response.message_id;
		this.bot.editMessageText(message,{chat_id:id,message_id:message_id,parse_mode:'HTML'})
	}
	async start(id){
		const start_message = await this.send(id,help(),menu);
		this.deleteThis = start_message;
	}
	async register(id,message_data){
		var sentMessage = sentMessage = await this.send(id,'Hold on..');
		var data = await this.users_dbc.getBy('telegram_id',id);
		if(data.length>1){
			this.edit(id,sentMessage,`Seems like you are already registered\n\nLogin id: <code><b>${getLoginId(data)}</b></code>`);
			return;
		}
		var new_user_id = genRandom(10,true);
		var user = {telegram_id:id,user_id:new_user_id,message_data:message_data,date:new Date()}
		await this.users_dbc.insert(user);
		this.edit(id,sentMessage,`Cool! Account created, now you can Login at TRext using this id <code>${new_user_id}</code>`);
	}
	async loginid(id){
		var sentMessage = await this.send(id,'Fetching your Login Id');
		var data = await this.users_dbc.getBy('telegram_id',id);
		if(data.length<1){
			this.edit(id,sentMessage,'sorry, you are not registered TRext user, Please create your account.',buttons.register);
			await this.send(id,'Register...',buttons.register);
			return;
		}
		this.edit(id,sentMessage,`Your TRext Login Id (<i>Click to copy</i>): <code>${getLoginId(data)}</code>`);
	}
	cases(msg_text,id,message_data){
		switch(msg_text){
			case '/start':
				this.start(id);
				break;
			case '/menu':
				this.start(id);
				break;
			case '/register':
				this.register(id,message_data);
				break;
			case '/loginid':
				this.loginid(id);
				break;
			default:
				this.send(id,'Unknown command!');
		}
	}
}

function getLoginId(fetched_data){
	var existing_login_id = fetched_data[0]['user_id'];
	return existing_login_id;
}

module.exports = botWorker;
