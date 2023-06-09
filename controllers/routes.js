const create = require('./create');
const view = require('./view');
const create_post = require('./create.post');
const edit = require('./edit');
const edit_post = require('./edit.post');
const explore = require('./explore/explore');
const connect = require('./connect');
const connect_post = require('./connect.post');

module.exports = {
                  create,
                  view,
                  create_post,
                  edit,
		  edit_post,
		  explore,
		  connect,
		  connect_post
                  }
