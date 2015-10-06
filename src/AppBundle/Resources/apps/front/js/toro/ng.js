define(['angular'], function(angular) {
  var ToroHahaFront;
  angular.element('body').attr('ng-controller', 'MainController');
  ToroHahaFront = angular.module('ToroHahaFront', ['ui.router']);
  ToroHahaFront.run([
    '$rootScope', function($rootScope) {
      return console.log('Run ...');
    }
  ]);
  return ToroHahaFront;
});
