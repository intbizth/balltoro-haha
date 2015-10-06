define ['toro/ng'], (ToroNg) ->
    ToroNg.controller 'MainController', [
        '$scope', ($scope) ->
            console.log $scope
    ]
