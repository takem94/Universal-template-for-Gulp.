import "regenerator-runtime/runtime";
import "core-js"; 

import "./modules/main.js"

window.onload = function () {
	console.log('Hello, World!');
	
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