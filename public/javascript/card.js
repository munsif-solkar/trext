function redirectToPage(event){
	console.log(event);
        var target = event;
        while(target && !target.classList.contains('main-card')){
                target = target.parentNode;
        }
        if (target && target.classList.contains('main-card')){
                var redirectUrl = target.dataset.redirectUrl;
                window.location.href='/'+redirectUrl;
        }
}
