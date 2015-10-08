define ['toro/ng'], (ToroNg) ->
    ToroNg.controller 'PhotoListController', [
        '$scope', '$http', 'Photos', ($scope, $http, Photos) ->
            $scope.photos = new Photos()
            $scope.selectedItem = 0
            $scope.selectPicture = (item) ->
                $scope.applyImage(item._links.photo_url.href)
                $scope.selectedItem = item.id

            $scope.category = null
            $scope.categories = null
            $scope.categorySelectizeConfig =
                valueField: 'id'
                labelField: 'name'
                placeholder: 'กรองตามหมวดหมู่'

            $scope.$watch 'category', (value) ->
                $scope.photos.page = 0
                $scope.photos.items = []
                $scope.photos.category = value
                $scope.photos.nextPage(value)

            $http.get('/categories').then (resp) ->
                $scope.categories = resp.data._embedded.items

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
                @category = null
                return @

            Photos::nextPage = ->
                return if @busy or @ended
                @busy = yes

                params =
                    page: @page + 1
                    criteria:
                        category: @category || null

                promise = $http
                    method: 'GET'
                    params: params
                    url: '/photos'

                promise.finally => @busy = no

                promise.then (xhr) =>
                    data = xhr.data
                    @page = data.page
                    @ended = yes if data.page is data.pages
                    @items = [].concat @items, data._embedded.items
                , (xhr) -> console.log 'error'

            return Photos
    ]
