//iterate placeholder topics of search bar
const topics = [
  'artificialintelligence',
  'machinelearning',
  'datascience',
  'cybersecurity',
  'internetofthings',
  'cloudcomputing',
  'blockchain',
  'virtualreality',
  'augmentedreality',
  'robotics',
  'quantumcomputing',
  'spaceexploration',
  'genetics',
  'biotechnology',
  'renewableenergy',
  'climatechange',
  'sustainabledevelopment',
  'neuroscience',
  'ethicalhacking',
  'digitalmarketing',
  'userexperiencedesign',
  'mobileappdevelopment',
  'webdevelopment',
  'cryptocurrency',
  'ecommerce',
  'socialmediamarketing',
  'art',
  'music',
  'literature',
  'history',
  'philosophy',
  'psychology'
];
function sleep(ms){
	return new Promise(resolve => setTimeout(resolve,ms));
}
async function loopTopics(topics){
	const search_input = document.getElementsByClassName('search-input')[0];
	var i = 0;
	var len = topics.length;
	while(i<len){
		var topic = topics[i];
		search_input.placeholder = topic;
		i = i+1;
		i==len?i=0 : null;
		await sleep(1000);
        }
}
document.addEventListener('DOMContentLoaded', function() {
  loopTopics(topics);
});
