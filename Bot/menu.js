
//var buttons = require('./buttons');

const menu = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Register', callback_data: '/register' }
      ],
      [
	{ text: 'Login id', callback_data: '/loginid' }
      ],
    ]
  }
};


module.exports = menu;
