angular.module('trextViewModule',[]).controller('footer-actions',function($scope){
	$scope.share = function(){
		navigator.share({
    		title: document.title,
    		url: window.location.href
  		})
	};
})
