define ['toro/ng'], (ToroNg) ->
    console.log 'MainController'

    ToroNg.controller 'MainController', [
        '$scope', '$mdDialog', ($scope, $mdDialog) ->
            #$scope.pageHeader = 'Admin'
            $scope.pageToolbarRight = 'templates/admin-toolbar-right.html'

#            $scope.showForm = (ev) ->
#                $mdDialog.show({
#                    controller: DialogController,
#                    templateUrl: 'dialog1.tmpl.html',
#                    parent: angular.element(document.body),
#                    targetEvent: ev,
#                    clickOutsideToClose:true
#                })
    ]
