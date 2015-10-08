requirejs.config
    urlArgs: "bust=" + (new Date()).getTime()

    include: "require-lib"
    paths:
        "require-lib":          "../bower_components/requirejs/require"
        "angular":              "../bower_components/angular/angular"
        "jquery":               "../bower_components/jquery/dist/jquery"
        "lightbox2":            "../bower_components/lightbox2/dist/js/lightbox"
        "bootstrap":            "../bower_components/bootstrap/dist/js/bootstrap"
        "metisMenu":            "../bower_components/metisMenu/dist/metisMenu"
        "slimScroll":           "../bower_components/slimScroll/jquery.slimscroll"
        "spectrum":             "../bower_components/spectrum/spectrum"
        "selectize":            "../bower_components/selectize/dist/js/standalone/selectize"
        "ng-colorpicker":       "../bower_components/angular-spectrum-colorpicker/dist/angular-spectrum-colorpicker"
        "ng-slim-scroll":       "../bower_components/angular-slimscroll/angular-slimscroll"
        "ng-selectize":         "../bower_components/angular-selectize2/dist/angular-selectize"

    shim:
        "angular":
            exports: "angular"
            deps: ['jquery']

        "ng-colorpicker":
            deps: ["jquery", "angular", "spectrum"]

        "ng-slim-scroll":
            deps: ["slimScroll", "angular"]

        "ng-selectize":
            deps: ["selectize", "angular"]

        "toro/ng":
            deps: [
                "angular"
                "ng-colorpicker"
                "ng-slim-scroll"
                "ng-selectize"
            ]

        "bootstrap": deps: ["jquery"]
        "metisMenu": deps: ["jquery"]
        "slimScroll": deps: ["jquery"]
        "lightbox2": deps: ["jquery"]

require ['selectize', 'toro/app'], (selectize) ->
    window['Selectize'] = selectize
    angular.bootstrap document, ['ToroHahaFront']
