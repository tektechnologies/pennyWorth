'use strict';
console.log('This is the app.js. Connected.');

var today = new Date();
var weekday = new Array(7);
weekday[0] = 'Sunday';
weekday[1] = 'Monday';
weekday[2] = 'Tuesday';
weekday[3] = 'Wednesday';
weekday[4] = 'Thursday';
weekday[5] = 'Friday';
weekday[6] = 'Saturday';

var dayOfWeek = weekday[today.getDay()];
console.log(dayOfWeek);
var date = (today.getMonth()+1) + '-' + today.getDay() + '-' + today.getFullYear();
var time = today.getHours() + ':' + ('0' + today.getMinutes()).slice(-2) + ':' + today.getSeconds();
var dateTime = dayOfWeek + ' ' + date + ' ' + 'Current Time: ' +time;


document.getElementById('dayAndTime').innerHTML = dateTime;
