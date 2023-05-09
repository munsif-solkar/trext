//dbclient
class dbClient{
        constructor(url_query,collection,find='params'){
		this.collection = collection;
		this.find = find;
		this.fetched_data = [];
		if(url_query !== null){
		  find=='params'? this.url_query = url_query.params.x : this.url_query = url_query.query;
		}
                this.fetched_data;
        }
	async render(){
		const all_data = await this.collection.find({}).toArray();
		return all_data;
	}
        async fetchAll(formatDate=false){
		var lookThrough = this.lookThrough;
                this.fetched_data = await this.collection.find({lookThrough:this.url_query}).toArray();
                if(formatDate && this.fetched_data.length > 0){
                        const e = this.fetched_data[0]['date'];
                        this.fetched_data[0]['date'] = `${e.getDate()}/${e.getMonth()+1}/${e.getFullYear()} ${e.getHours()}:${e.getMinutes()}`;
                }
                return this.fetched_data[0];
        }
	async fetchByTag(){
		function rmtag(tag){
                   if(tag.startsWith('#')){
                       tag = tag.slice(1);
                       return rmtag(tag);
                   }else{
                       return tag
                   }
                }
		if(this.find != 'query'){return;}
		//check tag
		var containsTag = Object.keys(this.url_query).includes('tag');
		if(containsTag){
		    var tag = this.url_query.tag;
		    if(tag){
			tag = '#'+rmtag(tag);
			this.fetched_data = await this.collection.find({'tags':tag}).toArray();
			this.fetched_data.resultsBy = tag;
			return this.fetched_data;
		    }
		}else{
			this.fetched_data = await this.collection.find({}).toArray();
			return this.fetched_data;
		}
	}
        exists(){
                if(this.fetched_data.length > 0){
                        return true;
                }else{
                        return false;
                }
        }
        edit_mode(error=0,setEditMode={}){
                setEditMode['edit_code'] = '';
                setEditMode['mode'] = 'edit';
                setEditMode['error'] = error;
                return setEditMode;
        }
        async update(updatedData){
                await this.collection.updateOne({'custom_url':this.url_query},{$set:updatedData});
        }
}

module.exports = dbClient;
