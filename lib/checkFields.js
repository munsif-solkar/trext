const fields = [
  'text_header',
  'text_body',
  'meta_information',
  'edit_code',
  'custom_url'
]

function checkFields(request_body){
	var invalid;
	var new_fields = Object.keys(request_body);
	if((typeof new_fields) == (typeof fields) && new_fields.length == fields.length){
	    new_fields.map(element=>{
		var exists = fields.includes(element);
		if(!exists){
		    invalid = true
		    return;
		}
	    })
	}else{
		invalid = true;
	}
	if(invalid){
		return false;
	}else{
		return true;
	}
}

module.exports = checkFields;
