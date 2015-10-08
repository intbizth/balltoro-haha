define(['jquery', 'lightbox2', 'selectize', 'spectrum', 'toro/controller/main', 'toro/controller/photo-list'], function($, lightbox2, selectize, spectrum) {
  window['Selectize'] = selectize;
  console.info('Toro Front app started.');
  return $(function() {
    return lightbox2.option({
      'resizeDuration': 200,
      'wrapAround': true
    });
  });
});
