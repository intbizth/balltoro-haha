define ['angular'], (angular) ->
    angular.element('body').attr 'ng-controller', 'MainController'
    ToroHahaAdmin = angular.module('ToroHahaAdmin', [
        'ui.router'
        'ngMaterial'
    ])

    ToroHahaAdmin.run ['$rootScope', ($rootScope) ->
        $rootScope.pageHeader = 'Toro Haha Admin'
        $rootScope.menus = [
            name: 'Home'
            icon: 'icon-home'
        ,
            name: 'List'
            icon: 'icon-settings'
        ]
    ]

#    ToroHahaAdmin.config [
#        '$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) ->
#            $urlRouterProvider.otherwise "/app/index"
#            state = $stateProvider.state
#
#            state 'app',
#                url: '/app'
#                abstract: yes
#                controller: ''
#    ]
