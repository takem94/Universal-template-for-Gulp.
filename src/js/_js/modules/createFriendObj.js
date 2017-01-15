'use strict';

var _slicedToArray = function () {
	function sliceIterator(arr, i) {
		var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
			for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
				_arr.push(_s.value);if (i && _arr.length === i) break;
			}
		} catch (err) {
			_d = true;_e = err;
		} finally {
			try {
				if (!_n && _i["return"]) _i["return"]();
			} finally {
				if (_d) throw _e;
			}
		}return _arr;
	}return function (arr, i) {
		if (Array.isArray(arr)) {
			return arr;
		} else if (Symbol.iterator in Object(arr)) {
			return sliceIterator(arr, i);
		} else {
			throw new TypeError("Invalid attempt to destructure non-iterable instance");
		}
	};
}();

function createFriendObj(nodeEl) {
	var imgSrc = nodeEl.firstElementChild.firstElementChild.getAttribute('src'),
	    fullName = nodeEl.firstElementChild.nextElementSibling.firstElementChild.innerText,
	    id = +nodeEl.getAttribute('data-id'),
	    _fullName$split = fullName.split(' '),
	    _fullName$split2 = _slicedToArray(_fullName$split, 2),
	    firstName = _fullName$split2[0],
	    lastName = _fullName$split2[1];

	var friend = {
		first_name: firstName,
		last_name: lastName,
		photo_100: imgSrc,
		id: id
	};

	return friend;
}

module.exports = createFriendObj;