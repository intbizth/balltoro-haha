requirejs.config
    urlArgs: "bust=" + (new Date()).getTime()

    include: "require-lib"
    paths:
        "require-lib":          "../bower_components/requirejs/require"
        "angular":              "../bower_components/angular/angular"
        "ui.router":            "../bower_components/angular-ui-router/release/angular-ui-router"
        "jquery":               "../bower_components/jquery/dist/jquery"
        "jquery.ui":            "../bower_components/jquery-ui/jquery-ui"
        "jquery.ui.touch":      "../bower_components/jqueryui-touch-punch/jquery.ui.touch-punch"
        "lightbox2":            "../bower_components/lightbox2/dist/js/lightbox"
        "bootstrap":            "../bower_components/bootstrap/dist/js/bootstrap"
        "metisMenu":            "../bower_components/metisMenu/dist/metisMenu"
        "slimScroll":           "../bower_components/slimScroll/jquery.slimscroll"
        "spectrum":             "../bower_components/spectrum/spectrum"
        "selectize":            "../bower_components/selectize/dist/js/standalone/selectize"
        #"colorpicker":           "../bower_components/mjolnic-bootstrap-colorpicker/dist/js/bootstrap-colorpicker"
        "ng-colorpicker":       "../bower_components/angular-spectrum-colorpicker/dist/angular-spectrum-colorpicker"
        "ng-drag-drop":         "../bower_components/angular-dragdrop/src/angular-dragdrop"
        "ng-slim-scroll":       "../bower_components/angular-slimscroll/angular-slimscroll"
        "ng-selectize":         "../bower_components/angular-selectize2/dist/angular-selectize"

    shim:
        "angular":
            exports: "angular"
            deps: ['jquery']

        "jquery.ui":
            deps: ['jquery']

        "jquery.ui.touch":
            deps: ['jquery.ui']

        "ui.router":
            deps: ["angular"]

        "ng-colorpicker":
            deps: ["jquery", "angular", "spectrum"]

        "ng-drag-drop":
            deps: ["jquery.ui.touch", "angular"]

        "ng-slim-scroll":
            deps: ["slimScroll", "angular"]

        "ng-selectize":
            deps: ["selectize", "angular"]

        "toro/ng":
            deps: [
                "angular"
                "ui.router"
                "ng-colorpicker"
                "ng-drag-drop"
                "ng-slim-scroll"
                "ng-selectize"
            ]

        "bootstrap": deps: ["jquery"]
        "metisMenu": deps: ["jquery"]
        "slimScroll": deps: ["jquery"]
        "lightbox2": deps: ["jquery"]

require ['selectize', 'toro/app'], (selectize) ->
    window.Selectize = selectize
    angular.bootstrap document, ['ToroHahaFront']
