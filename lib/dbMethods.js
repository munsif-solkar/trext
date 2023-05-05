//dbclient
class dbClient{
        constructor(url_query,collection){
		this.collection = collection;
		if(url_query !== null){
		  this.url_query = url_query.params.x;
		}
                this.fetched_data;
        }
	async render(){
		const all_data = await this.collection.find({}).toArray();
		return all_data;
	}
        async fetchAll(formatDate=false){
                this.fetched_data = await this.collection.find({'custom_url':this.url_query}).toArray();
                if(formatDate && this.fetched_data.length > 0){
                        const e = this.fetched_data[0]['date'];
                        this.fetched_data[0]['date'] = `${e.getDate()}/${e.getMonth()+1}/${e.getFullYear()} ${e.getHours()}:${e.getMinutes()}`;
                }
                return this.fetched_data[0];
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
