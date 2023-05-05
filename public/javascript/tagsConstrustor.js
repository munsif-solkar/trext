var scope;
app.controller('hashtags',function($scope){
	scope = $scope;
	$scope.constructTag = constructTag;
	$scope.$parent.tags = [];
});

function constructTag(tags){
	console.log(tags);
	const tagCriteria = /#[a-zA-Z0-9]+/g;
	tags = tags.trim();
	tags_matches = tags.match(tagCriteria);
	if(tags_matches && tags_matches.length > 0 || tags_matches === null){
		try{
		     addTag(tags_matches);
		}catch(err){
			alert(err);
		}
	}
}

function addTag(tags){
	if(tags_matches === null){
		scope.$parent.tags = [];
		return;
	}
	if(tags.length<=30){
	    scope.$parent.tags = tags;
        }else{
	    throw "You met Max tags limit (6) please remove some tags";
	}
}
