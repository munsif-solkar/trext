const tag_rules= {'regex':/#[a-zA-Z0-9]{1,50}\b/g,'min':1,'max':50,'error':'Invalid tags, Try removing some tags Max tags limit is 30','max_tags':30}

const edit_code_rules = {'min':4,'max':50,'error':"Invalid or empty 'Edit code'"}

const custom_url_rules = {'regex':/[^a-zA-Z0-9]/,'min':5,'max':40,'error':"Invalid or empty 'Custom url'"}

const text_header_rules = {'max':120,'error':"Please check your Title Field it must contain minimum of 1 character and max 20 characters are allowed."}

const text_body_rules = {'min':10,'max':2000,'error':"The textbox must contain minimun 10 characters and maximum of 900"}

const meta_information_rules = {'max':1000,'error':'Max characters limit for Description is 1000'}

module.exports = {tag_rules,edit_code_rules,custom_url_rules,text_header_rules,text_body_rules,meta_information_rules}
