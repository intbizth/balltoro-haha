requirejs.config
    urlArgs: "bust=" + (new Date()).getTime()

    include: "require-lib"
    paths:
        "require-lib":      "../bower_components/requirejs/require"
        "angular":          "../bower_components/angular/angular"
        "angular-aria":     "../bower_components/angular-aria/angular-aria"
        "angular-animate":  "../bower_components/angular-animate/angular-animate"
        "angular-material": "../bower_components/angular-material/angular-material"
        "ui.router":        "../bower_components/angular-ui-router/release/angular-ui-router"
        "jquery":           "../bower_components/jquery/dist/jquery"

    shim:
        "angular":
            exports: "angular"
            deps: ['jquery']
            init: -> window.angular

        "ui.router":
            deps: ["angular"]

        "angular-animate":
            exports: "angular"
            deps: ["angular"]
            init: -> window.angular

        "angular-aria":
            exports: "angular"
            deps: ["angular"]
            init: -> window.angular

        "angular-material":
            exports: "angular"
            deps: ["angular", "angular-animate", "angular-aria"]
            init: -> window.angular

        "toro/ng":
            deps: [
                "angular"
                "angular-animate"
                "angular-aria"
                "angular-material"
                "ui.router"
            ]

require ['toro/app'], ->
    angular.bootstrap document, ['ToroHahaAdmin']
