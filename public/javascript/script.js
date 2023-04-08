var app= angular.module("texttrack", []);
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
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
            };
            return result;
            }
	     	//ends
        }])
        function copyToClipboard(e){
            e.select();
            document.execCommand('copy');
        }
	function attrVal(query){
		var val = document.querySelector(query).value;
		return val.trim();
	}
