class button_constructor{
	constructor(){
		this.button_data = {};
		this.button = {
			reply_markup: {
    				inline_keyboard: []
			}
		}
	}
	addButton(text,callback){
		this.button_data.text = text;
		this.button_data.callback_data = callback;
		this.button.reply_markup.inline_keyboard.push([this.button_data]);
		this.show = this.button;
		return this;
	}
}

module.exports = button_constructor;
