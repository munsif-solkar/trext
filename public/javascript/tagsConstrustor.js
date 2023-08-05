var scope;
var parent;
var tags_limit = 30;
app.controller('hashtags',function($scope){
	scope = $scope;
	parent = scope.$parent
	$scope.constructTag = constructTag;
	parent.tags = [];
	parent.tags_counter = 0;
});

function constructTag(tags){
	const tagCriteria = /#[a-zA-Z0-9]{1,50}\b/g;
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
	if(tags === null){
		parent.tags = [];
		return;
	}
	parent.tags = tags;
	//console.log(parent.tags.length)
	if(tags.length > tags_limit){
		parent.tags_counter = '-'+(tags.length-tags_limit);
	}
	else{
		parent.tags_counter = tags.length;
	}
}
