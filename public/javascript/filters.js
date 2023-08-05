const filters = ['sort','limit']
var scope;
function setLimit($event){
	var limit = document.querySelector('.limit-value');
	const changeLimit = $event.target.classList;
	if(changeLimit.contains('increment-limit')){
		limit.value = parseInt(limit.value) + 1;
	}
	else{
		if(!limit.value=='0'){
		    limit.value = parseInt(limit.value) - 1;
		}
	}
}

//apply filters
var event;
function apply_filters($event){
	$event.preventDefault();
	const form = $event.target;
	event = form;
	const checkTagEntry = document.querySelector('.tag-search').value;
	var formData = new FormData(form);
	const path = window.location.pathname;
	if(checkTagEntry){
	    formData.append('tag',checkTagEntry);
	}
	formData = new URLSearchParams(formData);
	formData.get('limit') == 0? formData.delete('limit') : null;
	formData = formData.toString();
	const action = path + "?" + formData;
	window.location.href = action;
}

function fetchFilters(){
	const url = window.location.search;
	const urlData = new URLSearchParams(url);
	const filters_form = document.querySelector('.filters-section');
	filters.map(filter=>{
		if(urlData.has(filter)){
			console.log(filter);
			filters_form[filter].value = urlData.get(filter);
		}
	})
}

explore_events.controller('filters_controller',function($scope){
	scope = $scope;
	$scope.setLimit = setLimit;
	$scope.apply_filters = apply_filters;
})
