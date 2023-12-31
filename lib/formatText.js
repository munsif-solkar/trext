const {tag_rules} = require('./input_rules');

class TextFormat{
	purify(text){
		const sanitized = text.replaceAll('<','&lt;').replaceAll('>','&gt;');
		return sanitized;
	}
	applyAll(e){
		this.text = e;
		this.makeBold(this.text);
		this.makeItalic(this.text);
                this.highlight(this.text);
		this.heading(this.text);
		this.section(this.text);
		return this.text;
        }
	makeBold(e){
		const regex = /\*\*(.+?)\*\*/g;
		const result = e.replace(regex,"<b class='bold-text'>$1</b>");
		this.text = result;
		return result;
	}
	makeItalic(e){
		const regex = /\*(.+?)\*/g;
		const result = e.replace(regex,"<i class='italic-text'>$1</i>");
		this.text = result;
		return result;
	}
	heading(e){
		const lines = e.split('\n');
		var result = "";
		for(var line of lines){
			const raw_line=line;
			line = line.trim();
			if(line.startsWith("###")){
                            result += `<h3 class='heading h-3'>${line.substring(3)}</h3>`;
			}
			else if(line.startsWith("##")){
			    result += `<h2 class='heading h-2'>${line.substring(2)}</h2>`;
			}
			else if(line.startsWith("#")){
			    result += `<h1 class='heading h-1'>${line.substring(1)}</h1>`;
			}
			else{
			    result += `${raw_line}`;
			}
		}
		this.text = result;
		return result
	}
	highlight(e){
		const regex = /&&(.+?)&&/g;
		const result = e.replace(regex,"<mark class='mark-text'>$1</mark>")
		this.text = result;
		return result
	}
	section(e){
		//console.log(e);
		const lines = e.split('\r');
		console.log(lines);
		var result = "";
		for(var line of lines){
			if(line.trim()=='----'){
				result += "<hr class='h-line'/>";
			}
			else{
				result += line+'\n';
			}
		}
		this.text=result;
		return result;
	}
	formatHashtags(e){
		if(!e){
			return;
		}
		const regex = tag_rules.regex;
		const result = e.replace(regex,captured_part=>{
			var withoutHash = captured_part.slice(1).toLowerCase();
			const tagWrap = `<a href='/explore?tag=${withoutHash}' class='formatted-tag'>${captured_part}</a>`;
			return tagWrap;
		})
		this.text = result;
		return result;
	}
}

//export
module.exports = TextFormat;


