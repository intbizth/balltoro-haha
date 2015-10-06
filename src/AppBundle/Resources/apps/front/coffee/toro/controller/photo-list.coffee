define ['toro/ng'], (ToroNg) ->
    ToroNg.controller 'PhotoListController', [
        '$scope', 'Photos', ($scope, Photos) ->
            console.log Photos
            $scope.photos = new Photos()
    ]

    ToroNg.factory 'Photos', [
        '$http', ($http) ->
            Photos = ->
                @items = []
                @busy = no
                @after = ''

            Photos::nextPage = ->
                return if @busy
                @busy = yes

                promise = $http.get 'http://127.0.0.1:8000/photos'
                #promise.finally => @busy = no

                promise.then (xhr) =>
                    console.log(xhr)
                    data = xhr.data
                    @busy = no if data.total is data.pages
                , (xhr) ->
                    console.log(xhr)

            return Photos
    ]
