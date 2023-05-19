const {tag_rules} = require('./input_rules')
function splitMetaInformation(meta_information,filter='tags'){
        const regex = tag_rules.regex;
        const filterOut = {'tags':function(data){
                                      if(!data){return []}
                                      var tags_found = data.match(regex);
				      if(tags_found==null){return []}
                                      tags_found = tags_found.map(element=>{
				      	return element.toLowerCase();
                                      })
                                      return tags_found;
                                  },
                           'description':function(data){
                                      if(!data){return ''}
                                      var description = data.replace(regex,'');
                                      return description.trim();
                                  }
                           }
        return filterOut[filter](meta_information);
}

module.exports = splitMetaInformation;
