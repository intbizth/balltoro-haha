define ['toro/ng'], (ToroNg) ->
    ToroNg.controller 'PhotoListController', [
        '$scope', 'Photos', ($scope, Photos) ->
            $scope.photos = new Photos()
            $scope.photos.nextPage()
            $scope.selectedItem = 0
            $scope.selectPicture = (item) ->
                $scope.applyImage(item._links.photo_url.href)
                $scope.selectedItem = item.id
    ]

    ToroNg.directive 'whenScrolled', ->
        return (scope, elm, attr) ->
            raw = elm[0]

            elm.bind 'scroll', ->
                if (raw.scrollTop + raw.offsetHeight) >= raw.scrollHeight
                    scope.$apply attr.whenScrolled
                    return
            return

    ToroNg.factory 'Photos', [
        '$http', ($http) ->
            Photos = ->
                @items = []
                @busy = no
                @ended = no
                @page = 0
                return @

            Photos::nextPage = ->
                return if @busy or @ended
                @busy = yes

                promise = $http
                    method: 'GET'
                    url: '/photos?page=' + (@page + 1)

                promise.finally => @busy = no

                promise.then (xhr) =>
                    data = xhr.data
                    @page = data.page
                    @ended = yes if data.page is data.pages
                    angular.extend @items, data._embedded.items
                , (xhr) -> console.log 'error'

            return Photos
    ]
