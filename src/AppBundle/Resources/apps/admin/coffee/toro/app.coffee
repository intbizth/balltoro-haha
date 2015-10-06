define [
    'jquery'
    'lightbox2'
    'toro/inspinia'
    'toro/controller/main'
    'toro/controller/photo/create'
], ($, lightbox2) ->
    console.info 'Toro Admin app started.'

    $ ->
        lightbox2.option
            'resizeDuration': 200
            'wrapAround': true
