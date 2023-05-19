const {tag_rules,edit_code_rules,custom_url_rules,text_header_rules,text_body_rules} = require('./input_rules')

function verifyEntries(e){
        //text header
        th = e.text_header.trim();
        th = (th.length <=  text_header_rules.max);
        //text body
        tb = e.text_body.trim();
        tb = (tb.length >= text_body_rules.min && tb.length <= text_body_rules.max);
        //edit code
        ec = e.edit_code.replace(" ", "").trim();
        ec = (ec.length <= edit_code_rules.max && ec.length >= edit_code_rules.min);
        //custom url
        cu = e.custom_url;
        var raw_cu = cu;
        cu = cu.replace(custom_url_rules.regex,'').trim();
        if(raw_cu != cu){cu=''};
        cu = (cu && cu.length <= custom_url_rules.max && cu.length >= custom_url_rules.min);
        //hashtags
        const tagsCriteria = tag_rules.regex;
        var check_tags = e.meta_information.match(tagsCriteria);
        check_tags ? check_tags.map((tag)=>{
                isValid = tag.match(tagsCriteria);
                if(tag && !isValid){
                    throw "Invalid tags! Tag should'nt contain symbols";
                }
         }) : null;
	//final check
        if(!th){
                throw "Please check your Title Field it must contain minimum of 1 character and max 20 characters are allowed.";
        }
        else if(!tb){
                throw "The textbox must contain minimun 10 characters and maximum of 900";
        }
        else if(!ec){
                throw "Invalid or empty 'Edit code'";
        }
        else if(!cu){
                throw "Invalid or empty 'custom url'";
        }
        else{
                return true;
        }
}

module.exports = verifyEntries;
