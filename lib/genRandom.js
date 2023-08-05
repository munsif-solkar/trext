function genRandom(length=6,upper=false){
	var chars;
	var result = '';
	const chars_alpha_lower = 'qwertyuiopasdfghjklzxcvbnm';
	const chars_alpha_upper = 'QWERTYUIOPASDFGHJKLZXCVBNM';
	const chars_numbers = '1234567890';
	chars = chars_alpha_lower + chars_alpha_upper + chars_numbers;
	upper? chars = chars.replace(chars_alpha_lower,'') : null;
	for(var i=0;i<length;i++){
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
}
module.exports = genRandom;
