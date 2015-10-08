define [
    'jquery'
    'lightbox2'
    'selectize'
    'spectrum'
    'toro/controller/main'
    'toro/controller/photo-list'
], ($, lightbox2, selectize, spectrum) ->
    window['Selectize'] = selectize
    console.info 'Toro Front app started.'

    $ ->
        lightbox2.option
            'resizeDuration': 200
            'wrapAround': true

