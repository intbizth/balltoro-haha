define(['toro/ng'], function(ToroNg) {
  return ToroNg.controller('AdminPhotoCreateController', [
    '$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
      var loadCategories;
      $rootScope.pageHeader = 'Admin Create Photo';
      $scope.category = null;
      loadCategories = function() {
        return $http({
          method: 'GET',
          url: '/admin/categories'
        }).then(function(resp) {
          console.log(resp);
          return $scope.categories = resp.data;
        });
      };
      $scope.categories = loadCategories();
      $scope.searchTextChange = function(text) {
        console.log(text);
        return $scope.category = text;
      };
      $scope.selectedItemChange = function(item) {
        return console.log(item);
      };
      $scope.querySearch = function(text) {
        console.log(text);
        return $scope.categories;
      };
    }
  ]);
});
