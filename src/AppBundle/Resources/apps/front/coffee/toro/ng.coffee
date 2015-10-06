define ['angular'], (angular) ->
    angular.element('body').attr 'ng-controller', 'MainController'
    ToroHahaAdmin = angular.module('ToroHahaAdmin', [
        'ui.router'
        'infinite-scroll'
    ])

    ToroHahaAdmin.run ['$rootScope', ($rootScope) ->
        console.log 'Run ...'
    ]

    return ToroHahaAdmin
