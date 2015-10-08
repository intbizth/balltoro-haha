define(['toro/ng'], function(ToroNg) {
  ToroNg.controller('PhotoListController', [
    '$scope', '$http', 'Photos', function($scope, $http, Photos) {
      $scope.photos = new Photos();
      $scope.selectedItem = 0;
      $scope.selectPicture = function(item) {
        $scope.applyImage(item._links.photo_url.href);
        return $scope.selectedItem = item.id;
      };
      $scope.category = null;
      $scope.categories = null;
      $scope.categorySelectizeConfig = {
        valueField: 'id',
        labelField: 'name',
        placeholder: 'กรองตามหมวดหมู่'
      };
      $scope.$watch('category', function(value) {
        $scope.photos.page = 0;
        $scope.photos.ended = false;
        $scope.photos.items = [];
        $scope.photos.category = value;
        return $scope.photos.nextPage(value);
      });
      return $http.get('/categories').then(function(resp) {
        return $scope.categories = resp.data._embedded.items;
      });
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
        this.category = null;
        return this;
      };
      Photos.prototype.nextPage = function() {
        var params, promise;
        if (this.busy || this.ended) {
          return;
        }
        this.busy = true;
        params = {
          page: this.page + 1,
          criteria: {
            category: this.category || null
          }
        };
        promise = $http({
          method: 'GET',
          params: params,
          url: '/photos'
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
            return _this.items = [].concat(_this.items, data._embedded.items);
          };
        })(this), function(xhr) {
          return console.log('error');
        });
      };
      return Photos;
    }
  ]);
});
