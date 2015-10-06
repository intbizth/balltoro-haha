define ['angular'], (angular) ->
    angular.element('body').attr 'ng-controller', 'MainController'

    ToroHahaFront = angular.module('ToroHahaFront', [
        'ui.router'
    ])

    ToroHahaFront.run ['$rootScope', ($rootScope) ->
        console.log 'Run ...'
    ]

    return ToroHahaFront
