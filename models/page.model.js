const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
	text_header:{
		type:String,
		required:false,
		maxlength:120,
	},
	text_body:{
		type:String,
		required:true,
		minlength:10,
		maxlength:3000,
	},
	edit_code:{
		type:String,
		required:true,
		maxlength:50,
		minlength:4
	},
	custom_url:{
		type:String,
		required:true,
		unique:true,
		maxlength:40,
		minlength:5,
		match:/[^a-zA-Z0-9]+$/
	},
	meta_information:{
		type:String,
		maxlength:1000
	}
})

module.exports = mongoose.model('page',pageSchema)
