function splitMetaInformation(meta_information,filter='tags'){
        const regex = /#[a-zA-Z0-9]{1,20}\b/g;
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
