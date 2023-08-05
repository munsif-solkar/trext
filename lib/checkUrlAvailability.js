const exception_urls = ['howtouse','HOWTOUSE','Howtouse','HowToUse','connect','profile'];

async function checkUrlAvailability(url,collection){
	var checkUrl = await collection.find({'custom_url':url}).toArray();
	checkUrl.map(function(known_objects){
                exception_urls.push(known_objects.custom_url);
        })

	var notAvailable = exception_urls.includes(url);
	if(notAvailable){
		throw "Url not avilable";
	}
}

module.exports = checkUrlAvailability;
