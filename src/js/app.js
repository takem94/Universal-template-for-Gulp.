require('babel-polyfill');

window.onload = function () {
	console.log('hello worldssss!');
	function getPromise () {
	return new Promise (function (resolve) {
		setTimeout(function() {
			resolve('done!');
		},3000)
	});
};

async function ret() {
	let getText = await getPromise();
	
	console.log(getText);
}

ret();
};