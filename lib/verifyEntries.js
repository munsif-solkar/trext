function verifyEntries(e){
        //text header
        th = e.text_header.trim();
        th = (th.length <=  40);
        //text body
        tb = e.text_body.trim();
        tb = (tb && tb.length <= 2000);
        //edit code
        ec = e.edit_code.replace(" ", "").trim();
        ec = (ec && ec.length <= 9 && ec.length >= 5);
        //custom url
        cu = e.custom_url;
        var raw_cu = cu;
        cu = cu.replace(/[^a-zA-Z0-9]/g,'').trim();
        if(raw_cu != cu){cu=''};
        cu = (cu && cu.length <= 20 && cu.length >= 5);
        //hashtags
        const tagsCriteria = /#[a-zA-Z0-9]{1,20}\b/g;
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
