define(['jquery', 'lightbox2', 'toro/inspinia', 'toro/controller/main', 'toro/controller/photo/create'], function($, lightbox2) {
  console.info('Toro Admin app started.');
  return $(function() {
    return lightbox2.option({
      'resizeDuration': 200,
      'wrapAround': true
    });
  });
});
