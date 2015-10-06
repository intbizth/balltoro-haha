define(['angular'], function(angular) {
  var ToroHahaAdmin;
  angular.element('body').attr('ng-controller', 'MainController');
  ToroHahaAdmin = angular.module('ToroHahaAdmin', ['ui.router']);
  return ToroHahaAdmin.run([
    '$rootScope', function($rootScope) {
      $rootScope.pageHeader = 'Toro Haha Admin';
      return $rootScope.menus = [
        {
          name: 'Home',
          icon: 'icon-home'
        }, {
          name: 'List',
          icon: 'icon-settings'
        }
      ];
    }
  ]);
});
