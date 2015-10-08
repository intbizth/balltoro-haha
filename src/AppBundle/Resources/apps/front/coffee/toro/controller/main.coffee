define ['toro/ng', 'toro/canvas', 'toro/config'], (ToroNg, CanvasHelper, Config) ->
    ToroNg.controller 'MainController', [
        '$scope', '$http', ($scope, $http) ->
            new Config $scope

            startX = 0
            startY = 0
            activedDragText = -1
            $scope.$canvasEl = $canvasEl = angular.element($scope.config.canvasSelector)

            $scope.selectedImage = $canvasEl.data('def')
            $scope.imgWidth = $scope.config.image.width
            $scope.imgHeight = $scope.config.image.height
            $scope.activedMemeText = 0

            $scope.memeArray = $scope.config.texts
            $scope.fonts = $scope.config.fonts
            $scope.fontSizes = $scope.config.fontSizes
            $scope.fontStyles = $scope.config.fontStyles
            $scope.colorPalette = $scope.config.colors
            $scope.activedAttr = $scope.memeArray[$scope.activedMemeText]

            # Keep swear word for restore
            keepRestoreText = []
            swearWords = {}
            canvasHelper = new CanvasHelper($scope)
            originMeme = angular.copy($scope.memeArray)

            replaceText = (string) ->
                for word, replacement of swearWords
                    re = new RegExp(word, 'gi')

                    if re.test string
                        string = string.replace re, replacement

                return string

            textHittest = (x, y, textIndex) ->
                text = $scope.memeArray[textIndex]
                hitMoreUp = 60
                #เผื่อ hit บน
                hitMoreDown = 10
                hitLessAlign = 0
                #ขยาย hitbox ไปทางซ้าย กรณีชิด ช่น ชิดซ้าย=0; ชิดกลาง= ย่นไปครึ่ง;
                hitLessWidth = 0
                #ลดความกว้างของ hitbox กรณีชิด

                switch text.align
                    when 'left'
                        hitLessAlign = 0
                    when 'center'
                        hitLessAlign = text.w / 2 + 80
                        hitLessWidth = text.w - hitLessAlign
                    when 'right'
                        hitLessAlign = text.w
                        hitLessWidth = text.w

                x >= text.x - hitLessAlign and x <= text.x + text.w - hitLessWidth and y >= text.y - hitMoreUp and y <= text.h + hitMoreDown


            getMousePos = (evt) ->
                rect = $canvasEl[0].getBoundingClientRect()

                return {
                  x: evt.clientX - (rect.left)
                  y: evt.clientY - (rect.top)
                }

            handleMouseDown = (e) ->
                e.preventDefault()

                # calculate scale of canvas that smaller in responsive
                newWidth = $canvasEl.width()
                ratio = newWidth / $scope.imgWidth

                #น้อยหารมาก
                mouseXT = parseInt(getMousePos(e).x / ratio)
                mouseYT = parseInt(getMousePos(e).y / ratio)
                startX = mouseXT
                startY = mouseYT

                # check what am i clicking
                for text, i in $scope.memeArray
                    if textHittest(startX, startY, i)
                        console.log(i)
                        if text.dragable == true
                            $scope.$apply ->
                                $scope.activedMemeText = i
                            activedDragText = i

            handleMouseMove = (e) ->
                if activedDragText < 0
                    return

                e.preventDefault()

                mouse = getMousePos(e)
                mouseX = mouse.x
                mouseY = mouse.y

                text = $scope.memeArray[activedDragText]

                #Find Scale of responsive canvas
                newWidth = $canvasEl.width()
                ratio = newWidth / $scope.imgWidth

                #น้อยหารมาก
                mouseXT = parseInt(mouseX / ratio)
                mouseYT = parseInt(mouseY / ratio)
                dx = mouseXT - startX
                dy = mouseYT - startY

                startX = mouseXT
                startY = mouseYT
                text.x += dx
                text.y += dy

                canvasHelper.draw()
                return

            handleMouseUp = (e) ->
                e.preventDefault()
                activedDragText = -1
                return

            downloadImage = (uri, name) ->
                $area = angular.element($scope.config.downloadLinkSelector)
                $link = angular.element('<a>')
                $link.on 'click', ->
                    $link.remove()

                $area.append $link

                link = $link[0]
                link.download = name
                link.href = uri
                link.innerHTML = $scope.config.clickToDownload
                link.target = '_new'
                link.click()

            # APIs
            $scope.applyChange = ->
                canvasHelper.draw()
                return

            $scope.numRange = (start, end, skip) ->
                num = []
                i = start
                while i <= end
                    num.push i
                    i += skip
                return num

            $scope.applyAttr = (memeId, attr, value) ->
                $scope.memeArray[memeId][attr] = value
                $scope.applyChange()
                return

            $scope.applyImage = (image) ->
                img = new Image
                img.setAttribute 'crossOrigin', 'anonymous'
                img.src = image
                $state = angular.element($scope.config.canvasStateSelector)
                $state.addClass 'loading'

                img.onload = (e) ->
                    $state.removeClass 'loading'
                    $scope.selectedImage = image
                    $scope.applyChange()

                # Scroll up when select an image
                $('body').animate { scrollTop: $canvasEl.position().top - 40 }, 600
                return

            $scope.memeActive = (index) ->
                $scope.activedMemeText = index

            $scope.reset = ->
                $scope.memeArray = originMeme
                originMeme = angular.copy($scope.memeArray)
                $scope.applyChange()
                return

            # Download Image
            $scope.saveAsImage = ->
                $scope.repeatSwear true

                myInterval = setInterval((->
                    uri = $canvasEl[0].toDataURL()
                    downloadImage uri, 'balltoro-haha-' + (new Date()).getTime()
                    $scope.repeatSwear false
                    clearInterval myInterval
                    return
                ), 10)
                return

            $scope.repeatSwear = (wantReplace) ->
                if wantReplace
                    keepRestoreText = []
                    i = 0

                    while i < $scope.memeArray.length
                        keepRestoreText.push $scope.memeArray[i].memeText
                        $scope.memeArray[i].memeText = replaceText($scope.memeArray[i].memeText)
                        i++
                else
                    i = 0
                    while i < $scope.memeArray.length
                        $scope.$apply ->
                            $scope.memeArray[i].memeText = keepRestoreText[i]
                            return
                        i++

                $scope.applyChange()

            # init
            canvasHelper.draw()

            # listen for mouse events
            $canvasEl.mousedown handleMouseDown
            $canvasEl.mousemove handleMouseMove
            $canvasEl.mouseup handleMouseUp
            $canvasEl.mouseout handleMouseUp

            # Get swear words
            promise = $http
                type: 'GET'
                url: '/swears'

            promise.then (xhr) ->
                swearWords = JSON.parse(xhr.data.sw)

            # http://bgrins.github.io/spectrum/#details-acceptedColorInputs
            $scope.spectrumOptions =
                showPaletteOnly: yes
                togglePaletteOnly: yes
                togglePaletteMoreText: 'More'
                togglePaletteLessText: 'Less'
                preferredFormat: 'hex'
                color: $scope.activedAttr.fontColor
                palette: $scope.colorPalette

            $scope.$watch 'fontColor', (value) ->
                $scope.applyAttr $scope.activedMemeText, 'fontColor', (value || '#ffffff')

            $scope.$watch 'fontSize', (value) ->
                return unless value
                $scope.applyAttr $scope.activedMemeText, 'fontSize', value

            $scope.$watch 'fontStyle', (value) ->
                $scope.applyAttr $scope.activedMemeText, 'fontStyle', (value || 'normal')

            $scope.$watch 'fontFace', (value) ->
                return unless value
                $scope.applyAttr $scope.activedMemeText, 'fontFace', value

            # set active attrs
            $scope.$watch 'activedMemeText', (activeIndex) ->
                $scope.activedAttr = attr = $scope.memeArray[activeIndex]
                $scope.fontColor = attr.fontColor
                $scope.fontFace = attr.fontFace
                $scope.fontStyle = attr.fontStyle
                $scope.fontSize = attr.fontSize
                $('txt' + activeIndex).focus()
    ]
