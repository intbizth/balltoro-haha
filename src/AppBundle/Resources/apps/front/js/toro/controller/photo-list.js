define(['toro/ng'], function(ToroNg) {
  ToroNg.controller('PhotoListController', [
    '$scope', 'Photos', function($scope, Photos) {
      $scope.photos = new Photos();
      $scope.photos.nextPage();
      $scope.selectedItem = 0;
      return $scope.selectPicture = function(item) {
        $scope.applyImage(item._links.photo_url.href);
        return $scope.selectedItem = item.id;
      };
    }
  ]);
  ToroNg.directive('whenScrolled', function() {
    return function(scope, elm, attr) {
      var raw;
      raw = elm[0];
      elm.bind('scroll', function() {
        if ((raw.scrollTop + raw.offsetHeight) >= raw.scrollHeight) {
          scope.$apply(attr.whenScrolled);
        }
      });
    };
  });
  return ToroNg.factory('Photos', [
    '$http', function($http) {
      var Photos;
      Photos = function() {
        this.items = [];
        this.busy = false;
        this.ended = false;
        this.page = 0;
        return this;
      };
      Photos.prototype.nextPage = function() {
        var promise;
        if (this.busy || this.ended) {
          return;
        }
        this.busy = true;
        promise = $http({
          method: 'GET',
          url: 'http://127.0.0.1:8000/photos?page=' + (this.page + 1)
        });
        promise["finally"]((function(_this) {
          return function() {
            return _this.busy = false;
          };
        })(this));
        return promise.then((function(_this) {
          return function(xhr) {
            var data;
            data = xhr.data;
            _this.page = data.page;
            if (data.page === data.pages) {
              _this.ended = true;
            }
            return angular.extend(_this.items, data._embedded.items);
          };
        })(this), function(xhr) {
          return console.log('error');
        });
      };
      return Photos;
    }
  ]);
});
