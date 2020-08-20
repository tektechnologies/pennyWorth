'use strict';
console.log('This is the app.js. Connected.');



setInterval(function(){
//   document.getElementById("ID_of_the_time_element").innerHTML= getTime();

  var today = new Date();
  // console.log('the variable today ',today);
  var weekday = new Array(7);
  // console.log('the variable weekday ',weekday);

  weekday[0] = 'Sunday';
  weekday[1] = 'Monday';
  weekday[2] = 'Tuesday';
  weekday[3] = 'Wednesday';
  weekday[4] = 'Thursday';
  weekday[5] = 'Friday';
  weekday[6] = 'Saturday';

  var dayOfWeek = weekday[today.getDay()];
  // console.log('dayOfWeek ',dayOfWeek);

  var date = (today.getMonth()+1) + '-' + today.getDate() + '-' + today.getFullYear();
  // console.log('the variable date ', date);
  var time =  ('0' + today.getHours()).slice(-2) + ':'
             + ('0' + today.getMinutes()).slice(-2) + ':' 
             + ('0' + today.getSeconds()).slice(-2);
  var dateTime = dayOfWeek + ' ' + date + ' | ' + ' Current Time: ' + time;


  document.getElementById('dayAndTime').innerHTML = dateTime;

}, 1000);





console.log('this is where we will figure out how to give users access to the new social network for tech savy, go getter, hustlers');
