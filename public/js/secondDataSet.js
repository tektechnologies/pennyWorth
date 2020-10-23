'use strict';
console.log('This is the second Data Set.js. Connected.');
$(document).ready(function(){

  function Image(item) {
    this.image_url = item.image_url;
    this.title = item.title;
    this.description = item.description;
    this.keyword = item.keyword;
    this.level = item.level;
  }
  Image.prototype.render = function () {
    let template = $('#photo-template').html();
    let markup = Mustache.render(template, this);
    return markup;
  };

  Image.readJson = (page) => {
    Image.all = [];
    console.log('array image all', Image.all);
    // $('main').empty();

    const ajaxSettings = {
      method: 'get',
      dataType: 'json'
    };

    $.ajax(`dashboard-iconsJSON/page-${page}.json`, ajaxSettings)
      .then(data => {

        data.forEach(item => {
          Image.all.push(new Image(item));
        });

        Image.sortBy(Image.all, 'title');

        Image.all.forEach(image => {
          $('#image-container').append(image.render());
        });
        Image.populateFilter();

      });
  };

  Image.sortBy = (array, property) => {
    array.sort((a, b) => {
      let firstComparison = a[property];
      let secondComparison = b[property];
      return (firstComparison > secondComparison) ? 1 : (firstComparison < secondComparison) ? -1 : 0;
    });
  };

  Image.populateFilter = () => {
    let filterKeywords = [];

    $('option').not(':first').remove();

    Image.all.forEach(image => {
      if (!filterKeywords.includes(image.keyword)) {
        filterKeywords.push(image.keyword);
      }
    });

    filterKeywords.sort();

    filterKeywords.forEach(keyword => {
      let optionTag = `<option value="${keyword}">${keyword}</option>`;
      $('select').append(optionTag);
    });
  };

  Image.handleFilter = () => {
    $('select').on('change', function () {
      let selected = $(this).val();
      if (selected !== 'default') {
        $('div').hide();
        $(`div.${selected}`).fadeIn();
      }
    });
  };

  Image.handleSort = () => {
    $('input').on('change', function () {
      $('select').val('default');
      $('div').remove();
      Image.sortBy(Image.all, $(this).attr('id'));
      console.log('image array handle sort',Image.all);
      console.log('this is da facker', $(this).attr('id'));
      Image.all.forEach(image => {
        $('#image-container').append(image.render());
      });
    });
  };

  Image.handleImageEvents = () => {
    $('#image-container').on('click', 'div', function (event) {
      event.stopPropagation();
      let $clone = $(this).clone();
      let elements = $clone[0].children;
      $('#modalPopUp').addClass('active').html(elements);
      $(window).scrollTop(0);
    });

    $('body').on('click', function () {
      const $modalPopUp = $('#modalPopUp');
      $modalPopUp.empty();
      $modalPopUp.removeClass('active');
    });
  };

  //   Image.handleNavEvents = () => {
  //     $('footer ul, header ul').on('click', 'li', function () {
  //       $('#image-container').empty();
  //       Image.readJson($(this).attr('id'));
  //     });
  // };


  $(() => {
    Image.readJson(1);
    Image.handleFilter();
    Image.handleImageEvents();
    // Image.handleNavEvents();
    Image.handleSort();
  });




});
