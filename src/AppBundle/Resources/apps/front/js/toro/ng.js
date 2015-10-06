define(['angular'], function(angular) {
  var ToroHahaAdmin;
  angular.element('body').attr('ng-controller', 'MainController');
  ToroHahaAdmin = angular.module('ToroHahaAdmin', ['ui.router']);
  ToroHahaAdmin.run([
    '$rootScope', function($rootScope) {
      return console.log('Run ...');
    }
  ]);
  return ToroHahaAdmin;
});
