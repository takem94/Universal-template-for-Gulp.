"use strict";

let createFriendObj = require('./modules/createFriendObj');

let jack = document.querySelector('div');
let h2 = document.querySelector('h2');


jack.addEventListener("click", (e) => { e.target.style.display = 'none'; })

h2.addEventListener("click", (es) => { jack.style.display = ''; })