define(['angular'], function(angular) {
  var ToroHahaFront;
  angular.element('body').attr('ng-controller', 'MainController');
  ToroHahaFront = angular.module('ToroHahaFront', ['ui.router', 'ui.slimscroll', 'selectize', 'ngDragDrop', 'angularSpectrumColorpicker']);
  ToroHahaFront.config([
    '$httpProvider', function($httpProvider) {
      return $httpProvider.defaults.paramSerializer = '$httpParamSerializerJQLike';
    }
  ]);
  ToroHahaFront.run([
    '$rootScope', function($rootScope) {
      return console.log('Run ...');
    }
  ]);
  return ToroHahaFront;
});
