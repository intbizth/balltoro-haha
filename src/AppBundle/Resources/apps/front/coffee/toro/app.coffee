define [
    'jquery'
    'lightbox2'
    'colorpicker'
    'toro/controller/main'
    'toro/controller/photo-list'
], ($, lightbox2) ->
    console.info 'Toro Admin app started.'

    $ ->
        lightbox2.option
            'resizeDuration': 200
            'wrapAround': true

