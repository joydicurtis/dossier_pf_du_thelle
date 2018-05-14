(function () {
  jQuery(function($) {

    var $toggleElem = $('.js-toggle'),
        $teasersSlider = $('.js-teasersSlider'),
        $casinoSlider = $('.js-casinosSlider'),
        $searchToggle = $('.js-searchToggle'),
        $objFitImages = $('.js-ofImg');

    var mediaBP = {
      medium: 'only screen and (min-width: 750px)',
      large: 'only screen and (min-width: 1024)',
      xlarge: 'only screen and (min-width: 1200px)',
      xxlarge: 'only screen and (min-width: 1440px)'
    };

    // apply polyfill for object-fill css rule
    if ($objFitImages.length > 0) {
      objectFitImages($objFitImages);
    }

    $toggleElem.click(function (e) {
      e.preventDefault();
      var $toggleTarget = $($(this).data('toggle'));
      $toggleTarget.toggleClass('is-open');
      e.stopPropagation();
      hideOnClickOutside($(this).data('toggle'));
    });

    function hideOnClickOutside(element) {
      $(document).click(function(event) {
        if(!$(event.target).closest(element).length) {
          if($(element).is(":visible")) {
            $(element).toggleClass('is-open');
          }
        }
      });
    }

    $searchToggle.click(function (e) {
      e.preventDefault();
      var $toggleTarget = $($(this).data('toggle'));
      $toggleTarget.toggleClass('is-open');
      if($toggleTarget.hasClass('is-open')) {
        $toggleTarget.find('input[type=text]').focus();
      }
    });

  });
})();
