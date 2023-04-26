var app= angular.module("trext", []);
        app.controller("page-control", ['$scope', function($app){
		$app.text_header = attrVal('.page-title');
		$app.text_body = attrVal('.textbox');
		$app.page_key = attrVal('.page-key');
		$app.custom_url = attrVal('.custom-url');
	    //random string generator
            $app.genRandom = function(){
                const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    		const length=6;
    		let result = '';
    		const charactersLength = characters.length;
    		for (let i = 0; i < length; i++ ) {
        		result += characters.charAt(Math.floor(Math.random() * charactersLength));
            	};
            	return result;
            }
	    //ends
	    $app.copyToClipboard = function(e){
		e.select();
		document.execCommand('copy');
	    };
	    $app.path = function(url_key){
		var url = window.location.href.replace(window.location.pathname,"");
		if(url.endsWith('/')){
			url = url.slice(0,-1);
		}
		url += "/"+url_key;
		return url;
           }
        }])
	function attrVal(query){
		var val = document.querySelector(query).value;
		return val.trim();
	}
