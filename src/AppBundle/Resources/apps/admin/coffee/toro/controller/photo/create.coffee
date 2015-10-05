define ['toro/ng'], (ToroNg) ->

    ToroNg.controller 'AdminPhotoCreateController', [
        '$scope', '$rootScope', '$http', ($scope, $rootScope, $http) ->
            $rootScope.pageHeader = 'Admin Create Photo'
            $scope.category = null

            loadCategories = ->
                $http({
                    method: 'GET'
                    url: '/admin/categories'
                }).then((resp) ->
                    console.log resp
                    $scope.categories = resp.data

                )

            $scope.categories = loadCategories()

            $scope.searchTextChange = (text) ->
                console.log text
                $scope.category = text

            $scope.selectedItemChange = (item) ->
                console.log item

            $scope.querySearch = (text) ->
                console.log text
                return $scope.categories

            return
        ]
