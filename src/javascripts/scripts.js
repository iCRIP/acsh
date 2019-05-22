/* eslint-disable func-names */
// Add your scripts here
import * as jQuery from 'jquery';
import 'bootstrap';
// export for others scripts to use

// workaround for main-carousel-counter
jQuery(document).ready(($) => {
  if ($('.main-carousel-counter').length) {
    const counter = $('.main-carousel-counter');
    const summ = counter.siblings('.main-carousel-indicators').children().length;
    const summText = counter.find('.main-carousel-summ');
    const summIndex = counter.find('.main-carousel-index');

    summText.text(() => {
      const text = summ < 10 ? `0${summ}` : summ;
      return text;
    });

    $('#main-carousel').on('slide.bs.carousel', (event) => {
      const index = event.to + 1;
      const digit = index < 10 ? `0${index}` : index;
      const newSpan = $('<span></span>');
      const oldSpan = summIndex.find('span');

      oldSpan
        .removeClass('in')
        .addClass('out')
        .delay(1000)
        // eslint-disable-next-line func-names
        .queue(function (next) {
          $(this).remove();
          next();
        });
      newSpan.text(digit);
      summIndex.prepend(newSpan);
      // eslint-disable-next-line func-names
      newSpan.delay(100).queue(function (next) {
        $(this).addClass('in');
        next();
      });
    });
  }

  // custom selects

  $('.filter-select').hover(function () {
    $(this).addClass('active');
  }, function () {
    $(this).removeClass('active');
  });

  $('.filter-select-item').click(function () {
    const wrapper = $(this).parent().parent();
    const text = $(this).find('.filter-select-text').text();
    wrapper.find('.filter-select-current').text(text);
    wrapper.removeClass('active');
  });

  function dataImage(index, item) {
    $(item).attr('src', $(item).data('src'));
  }

  $('img[data-src]').each(dataImage);
});
