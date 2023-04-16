class TextFormat{
	purify(text){
		const sanitized = text.replaceAll('<','&lt;').replaceAll('>','&gt;');
		return sanitized;
	}
	applyAll(e){
		this.text = e
                this.makeBold(this.text);
                this.highlight(this.text);
		this.heading(this.text)
		return this.text;
        }
	makeBold(e){
		const regex = /\*\*(\S.+)\*\*/g;
		const result = e.replace(regex,"<b class='bold-text'>$1</b>");
		this.text = result;
		return result;
	}
	heading(e){
		const lines = e.split('\n');
		var result = "";
		for(const line of lines){
			if(line.startsWith("###")){
                            result += `<h3 class='heading h-3'>${line.substring(3)}</h3><br/>`
			}
			else if(line.startsWith("##")){
			    result += `<h2 class='heading h-2'>${line.substring(2)}</h2><br/>`;
			}
			else if(line.startsWith("#")){
			    result += `<h1 class='heading h-1'>${line.substring(1)}</h1><br/>`;
			}
			else{
			    result += `${line}<br/>`;
			}
		}
		this.text = result;
		return result
	}
	highlight(e){
		const regex = /&&(\S.+)&&/g;
		const result = e.replace(regex,"<mark class='mark-text'>$1</mark>");
		this.text = result;
		return result
	}
}

//export
module.exports = TextFormat;


