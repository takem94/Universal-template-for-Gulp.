"use strict";

var createFriendObj = require('./modules/createFriendObj');

var jack = document.querySelector('div');
var h2 = document.querySelector('h2');

jack.addEventListener("click", function (e) {
  e.target.style.display = 'none';
});

h2.addEventListener("click", function (es) {
  jack.style.display = '';
});