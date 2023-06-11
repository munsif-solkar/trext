const {tag_rules,custom_url_rules,text_header_rules,text_body_rules,meta_information_rules} = require('./input_rules')

function verifyEntries(e){
        //text header
        th = e.text_header.trim();
        th = (th.length <=  text_header_rules.max);
        //text body
        tb = e.text_body.trim();
        tb = (tb.length >= text_body_rules.min && tb.length <= text_body_rules.max);
        //custom url
        cu = e.custom_url;
        var raw_cu = cu;
        cu = cu.replace(custom_url_rules.regex,'').trim();
        if(raw_cu != cu){cu=''};
        cu = (cu && cu.length <= custom_url_rules.max && cu.length >= custom_url_rules.min);
        //meta information
	var meta_information = e.meta_information;
	meta_information = meta_information.length < meta_information_rules.max;
	//hashtags
        const tagsCriteria = tag_rules.regex;
        var check_tags = e.meta_information.match(tagsCriteria);
	if(check_tags!=null){
	    if(check_tags.length>tag_rules.max_tags){
	        	throw tag_rules.error;
	    }
            check_tags ? check_tags.map((tag)=>{
                    isValid = tag.match(tagsCriteria);
                    if(tag && !isValid){
                        throw tag_rules.error;
                    }
             }) : null;
	}
	//final check
        if(!th){
                throw text_header_rules.error;
        }
        else if(!tb){
                throw text_body_rules.error
        }
	else if(!meta_information){
		throw meta_information_rules.error;
	}
        else if(!cu){
                throw custom_url_rules.error;
        }
        else{
                return true;
        }
}

module.exports = verifyEntries;
