requirejs.config
    urlArgs: "bust=" + (new Date()).getTime()

    include: "require-lib"
    paths:
        "require-lib":          "../bower_components/requirejs/require"
        "angular":              "../bower_components/angular/angular"
        "ng-infinite-scroll":   "../bower_components/ngInfiniteScroll/build/ng-infinite-scroll"
        "ui.router":            "../bower_components/angular-ui-router/release/angular-ui-router"
        "jquery":               "../bower_components/jquery/dist/jquery"
        "lightbox2":            "../bower_components/lightbox2/dist/js/lightbox"
        "bootstrap":            "../bower_components/bootstrap/dist/js/bootstrap"
        "metisMenu":            "../bower_components/metisMenu/dist/metisMenu"
        "slimScroll":           "../bower_components/slimScroll/jquery.slimscroll"

    shim:
        "angular":
            exports: "angular"
            deps: ['jquery']
            init: -> window.angular

        "ng-infinite-scroll":
            deps: ['angular']

        "ui.router":
            deps: ["angular"]

        "toro/ng":
            deps: [
                "angular"
                "ng-infinite-scroll"
                "ui.router"
            ]

        "bootstrap":  deps: ["jquery"]
        "metisMenu":  deps: ["jquery"]
        "slimScroll":  deps: ["jquery"]
        "lightbox2":  deps: ["jquery"]

require ['toro/app'], ->
    angular.bootstrap document, ['ToroHahaAdmin']
