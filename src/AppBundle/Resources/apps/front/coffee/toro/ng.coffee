define ['angular'], (angular) ->
    angular.element('body').attr 'ng-controller', 'MainController'

    ToroHahaFront = angular.module('ToroHahaFront', [
        'ui.slimscroll'
        'selectize'
        'angularSpectrumColorpicker'
    ])

    ToroHahaFront.config ['$httpProvider', ($httpProvider) ->
        $httpProvider.defaults.paramSerializer = '$httpParamSerializerJQLike'
    ]

    ToroHahaFront.run ['$rootScope', ($rootScope) ->
        console.log 'Run ...'
    ]

    return ToroHahaFront
