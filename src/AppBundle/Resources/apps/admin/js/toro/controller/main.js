define(['toro/ng'], function(ToroNg) {
  console.log('MainController');
  return ToroNg.controller('MainController', [
    '$scope', function($scope) {
      return $scope.pageToolbarRight = 'templates/admin-toolbar-right.html';
    }
  ]);
});
