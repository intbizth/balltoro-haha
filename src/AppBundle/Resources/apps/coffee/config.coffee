requirejs.config
    urlArgs: "bust=" + (new Date()).getTime()

    paths:
        "require-lib":  "node_modules/gulp-requirejs-optimize/node_modules/requirejs/require"
        "jquery":       "bower_components/jquery/dist/jquery"
        "semantic":     "bower_components/semantic/dist/semantic"
        "angular":      "bower_components/angular/angular"
        "filesaver":    "bower_components/FileSaver.js/FileSaver"
        "canvas2blob":  "bower_components/canvas-toBlob.js/canvas-toBlob"

    include: "require-lib"

    #map:
    #    "*":
    #        "jquery": "jquery-core"

    shim:
        "angular":
            exports: "angular"
            init: (angular) ->
                return angular

        "filesaver":
            exports: "FileSaver"
            deps: ["canvas2blob"]
            init: (FileSaver) ->
                return FileSaver

        "semantic":
            deps: ["jquery"]
            exports: "$"
            init: ($) ->
                "$.fn.accordion": $.fn.accordion,
                "$.fn.accordion.settings": $.fn.accordion.settings,
                "$.fn.api": $.fn.api,
                "$.fn.apiButton": $.fn.apiButton,
                "$.fn.apiButton.settings": $.fn.apiButton.settings,
                "$.fn.colorize": $.fn.colorize,
                "$.fn.colorize.settings": $.fn.colorize.settings,
                "$.fn.form": $.fn.form,
                "$.fn.form.settings": $.fn.form.settings,
                "$.fn.state": $.fn.state,
                "$.fn.state.settings": $.fn.state.settings,
                "$.fn.chatroom": $.fn.chatroom,
                "$.fn.chatroom.settings": $.fn.chatroom.settings,
                "$.fn.checkbox": $.fn.checkbox,
                "$.fn.checkbox.settings": $.fn.checkbox.settings,
                "$.fn.dimmer": $.fn.dimmer,
                "$.fn.dimmer.settings": $.fn.dimmer.settings,
                "$.fn.dropdown": $.fn.dropdown,
                "$.fn.dropdown.settings": $.fn.dropdown.settings,
                "$.fn.modal": $.fn.modal,
                "$.fn.modal.settings": $.fn.modal.settings,
                "$.fn.nag": $.fn.nag,
                "$.fn.nag.settings": $.fn.nag.settings,
                "$.fn.popup": $.fn.popup,
                "$.fn.popup.settings": $.fn.popup.settings,
                "$.fn.rating": $.fn.rating,
                "$.fn.rating.settings": $.fn.rating.settings,
                "$.fn.search": $.fn.search,
                "$.fn.search.settings": $.fn.search.settings,
                "$.fn.shape": $.fn.shape,
                "$.fn.shape.settings": $.fn.shape.settings,
                "$.fn.sidebar": $.fn.sidebar,
                "$.fn.sidebar.settings": $.fn.sidebar.settings,
                "$.fn.tab": $.fn.tab,
                "$.fn.tab.settings": $.fn.tab.settings,
                "$.fn.transition": $.fn.transition,
                "$.fn.transition.settings": $.fn.transition.settings,
                "$.fn.video": $.fn.video,
                "$.fn.video.settings": $.fn.video.settings

require(['toro/app']);
