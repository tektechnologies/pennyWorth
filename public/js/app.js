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







function Image(item) {
  this.image_url = item.image_url;
  this.title = item.title;
  this.description = item.description;
  this.keyword = item.keyword;
  this.level = item.level;
}

Image.all = [];

Image.prototype.render = function () {
  let $templateClone = $('<div></div>');
  $templateClone.html($('#photo-template').html());
  $templateClone.find('h2').text(this.title);
  $templateClone.find('img').attr('src', this.image_url);
  $templateClone.find('p').text(this.description);
  $templateClone.attr('class', this.keyword);
  $('main').append($templateClone);
};

Image.readJson = () => {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };

  $.ajax('../dashboard-iconsJSON/page-1.json', ajaxSettings)
    .then(data => {
      data.forEach(item => {
        Image.all.push(new Image(item));
      });

      Image.all.forEach(image => {
        $('main').append(image.render());
      });

    })
    .then(Image.populateFilter)
    .then(Image.handleFilter);
};



//helper function that stores keywords for options.
Image.populateFilter = () => {
  let filterKeywords = [];
  console.log('filterkeywords', filterKeywords);

  $('option').not(':first').remove();

  Image.all.forEach(image => {
    if (!filterKeywords.includes(image.keyword)) filterKeywords.push(image.keyword);
  });

  filterKeywords.sort();

  filterKeywords.forEach(keyword => {
    let optionTag = `<option value="${keyword}">${keyword}</option>`;
    $('select').append(optionTag);
  });
};



//helper function to handle the image switching
Image.handleFilter = () => {
  $('select').on('change', function () {
    let userSelected = $(this).val();
    if (userSelected !== 'default') {
      $('div').hide();

      Image.all.forEach(image => {
        if (userSelected === image.keyword) {
          $(`div[class="${userSelected}"]`).addClass('filtered').fadeIn();
        }
      });

      $(`option[value=${userSelected}]`).fadeIn();
    } else {
      $('div').removeClass('filtered').fadeIn();
      $(`option[value=${userSelected}]`).fadeIn();
    }
  });
};

$(() => Image.readJson());




console.log('this is where we will figure out how to give users access to the new social network for tech savy, go getter, hustlers');
