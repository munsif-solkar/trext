app.controller("page-control", function($scope,$rootScope){
		$scope.text_header = attrVal('.page-title');
		$scope.text_body = attrVal('.textbox');
		$scope.custom_url = attrVal('.custom-url');
		$scope.form = document.getElementsByClassName('main-form')[0];
		$scope.metaInformation = attrVal('.meta-information');
	    //random string generator
                $scope.genRandom = function(){
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
	    $scope.copyToClipboard = function(e){
		e.select();
		document.execCommand('copy');
	    };
	    $scope.path = function(url_key,$event){
		const regex = /[^a-zA-Z0-9]/;
		const urlPreview = document.querySelector('.custom-url-preview');
		if(url_key && url_key.match(regex)!=null){
			urlPreview.classList.add('onError');
		}else{
			urlPreview.classList.remove('onError')
		}
		var url = window.location.href.replace(window.location.pathname,"");
		if(url.endsWith('/')){
			url = url.slice(0,-1);
		}
		url += "/"+url_key;
		return url;
           }
	   $scope.exploreToggle = function($event){
	        checkbox = $event.target;
		const args = {'checkbox':checkbox,'scope':$scope}
		$rootScope.$broadcast('displayHashtags', args);
	   };
	   $scope.submitForm = function(){
		const getTags = $scope.$$childHead.tags;
		if($scope.explore){
			if(getTags.length > 0){
				$scope.form.submit();
			}else{
				alert('Please add few tags!');
			}
			return;
		}
		$scope.form.submit();
	   }
        })
	function attrVal(query){
		var val = document.querySelector(query).value;
		return val.trim();
	}
