


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
