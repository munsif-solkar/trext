//dbclient
class dbMethods{
        constructor(url_query,collection,find='params'){
		this.collection = collection;
		this.find = find;
		this.fetched_data = [];
		if(url_query !== null){
		  find=='params'? this.url_query = url_query.params.page_path : this.url_query = url_query.query;
		}
		this.resultsBy="";
        }
	async render(){
		const all_data = await this.collection.find({}).toArray();
		return all_data;
	}
        async fetchByUrl(formatDate=false){
                this.fetched_data = await this.collection.find({'custom_url':this.url_query}).toArray();
                if(formatDate && this.fetched_data.length > 0){
			var date = this.fetched_data[0]['date'];
                        this.fetched_data[0]['date'] = this.format_date(date);
                }
                return this.fetched_data[0];
        }
	async fetchByTag(){
		function filter_tag(tag){
                   if(tag.startsWith('#')){
                       tag = tag.slice(1);
                       return filter_tag(tag);
                   }else{
		       tag = tag.trim().replaceAll(' ','');
                       return tag
                   }
                }
		if(this.find != 'query'){return;}
		//check tag
		var containsTag = Object.keys(this.url_query).includes('tag');
		if(containsTag){
		    var tag = this.url_query.tag;
		    if(tag){
			tag = filter_tag(tag);
			this.resultsBy = tag;
			tag = "#"+tag;
			this.fetched_data = await this.collection.find({'tags':tag}).toArray();
			this.fetched_data.resultsBy = tag;
			return this.fetched_data;
		    }
		}else{
			this.fetched_data = await this.collection.find({}).toArray();
			return this.fetched_data;
		}
	}
	async getBy(identifier,value){
		if(identifier){
			this.fetched_data = await this.collection.find({identifier:value}).toArray();
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
        format_date(date){
		date = date = `${date.getDate()} ${date.toLocaleString('default',{'month':'short'})} ${date.getFullYear()}`;
		return date;
	}
	//insertion
	async insert(data){
		await this.collection.insertOne(data);
	}
        async update(updatedData){
                await this.collection.updateOne({'custom_url':this.url_query},{$set:updatedData});
        }
}

module.exports = dbMethods;
