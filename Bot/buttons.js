const btn = require('./button_constructor')



const buttons = {
		register: new btn().addButton('Register','/register').show,
		loginid: new btn().addButton('Login Id','/loginid').show,
		menu: new btn().addButton('.....','/menu').show
	}

module.exports = buttons;

