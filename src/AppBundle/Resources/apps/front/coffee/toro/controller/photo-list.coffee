define ['toro/ng'], (ToroNg) ->
    ToroNg.controller 'PhotoListController', [
        '$scope', ($scope) ->
            console.log 'PhotoListController'
            $scope.xxx = 'Test'
    ]
