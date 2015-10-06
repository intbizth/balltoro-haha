define(['jquery', 'lightbox2', 'colorpicker', 'toro/controller/main', 'toro/controller/photo-list'], function($, lightbox2) {
  console.info('Toro Front app started.');
  return $(function() {
    return lightbox2.option({
      'resizeDuration': 200,
      'wrapAround': true
    });
  });
});
