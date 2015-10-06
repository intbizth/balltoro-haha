define ['toro/ng', 'toro/canvas', 'toro/config'], (ToroNg, CanvasHelper, Config) ->
    ToroNg.controller 'MainController', [
        '$scope', '$http', ($scope, $http) ->
            new Config $scope

            selectedText = -1
            startX = 0
            startY = 0
            $scope.$canvasEl = $canvasEl = angular.element($scope.config.canvasSelector)

            $scope.selectedImage = $canvasEl.data('def')
            $scope.imgWidth = $scope.config.image.width
            $scope.imgHeight = $scope.config.image.height
            $scope.fontFace = $scope.config.fontFace
            $scope.selectedMemeText = 0

            $scope.memeArray = $scope.config.texts
            $scope.fontList = $scope.config.fontList
            $scope.colors = $scope.config.colors
            $scope.shadows = $scope.config.shadows

            canvasOffset = $canvasEl.offset()
            offsetX = canvasOffset.left
            offsetY = canvasOffset.top
            scrollX = $canvasEl.scrollLeft()
            scrollY = $canvasEl.scrollTop()

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

            selectHighlight = (index) ->
                keepBorder = $scope.memeArray[index].border
                startBorder = 80

                #=== blink panel ===//
                $($('.blink')[index]).addClass 'blink-effect'

                blinkInterval = setInterval((->
                    $($('.blink')[index]).removeClass 'blink-effect'
                    clearInterval blinkInterval
                    return
                ), 500)

                #$("#txt"+index).focus(); //ทำการ setFocus
                #$("#txt"+index).select(); //ทำการ SelectAll
                #=== animate selected text border ===//
                myInterval = setInterval((->
                    if startBorder > keepBorder
                        $scope.memeArray[index].border = startBorder
                        canvasHelper.draw()
                        startBorder -= 5
                    else
                        clearInterval myInterval
                        $scope.memeArray[index].border = keepBorder
                    return
                ), 10)

                return

            textHittest = (x, y, textIndex) ->
                text = $scope.memeArray[textIndex]
                hitMoreUp = 60
                #เผื่อ hit บน
                hitMoreDown = 10
                #$scope.font_size*1.3; //เผื่อ hit ลง
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

                newWidth = $canvasEl.width()
                newHeight = $canvasEl.height()

                x >= text.x - hitLessAlign and x <= text.x + text.w - hitLessWidth and y >= text.y - hitMoreUp and y <= text.h + hitMoreDown
                #return (x >= (text.x - hitLessAlign) && x <= text.x + (text.w - hitLessWidth) && y >= (text.y - hitMoreUp) && y <= (text.h+hitMoreDown));
                #[ เริ่ม x กว้างถึง width ---- width]
                #[ y | | | | height]


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

                #check what am i clicking
                i = 0

                while i < $scope.memeArray.length
                    if textHittest(startX, startY, i)
                        if $scope.memeArray[i].dragable == true
                            selectHighlight i
                            $scope.$apply ->
                                $scope.selectedMemeText = i
                                return

                            #เปลี่ยน ค่าต่างใน element panel
                            selectedText = i
                            #ลากได้ไหม ยกเว้นเครดิต
                    i++
                return

            handleMouseMove = (e) ->
                if selectedText < 0
                    return

                e.preventDefault()

                mouse = getMousePos(e)
                mouseX = mouse.x
                mouseY = mouse.y

                text = $scope.memeArray[selectedText]

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
                selectedText = -1
                return

            randomName = ->
                n = []
                i = 0
                while i < 5
                    n.push Math.floor(Math.random() * 16).toString(16)
                    i++
                n.join ''

            downloadImage = (uri, name) ->
                # todo is support brows
                link = angular.element('<a>')[0]
                link.download = name
                link.href = uri
                link.click()
                # else
                #window.location.href = uri

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

            $scope.txtAlign = (memeId, align) ->
                $scope.memeArray[memeId].align = align
                $scope.applyChange()
                return

            $scope.txtSize = (memeId, size) ->
                # ปุ่มปรับขนาด
                $scope.memeArray[memeId].size = size
                $scope.applyChange()
                return

            $scope.pickFontColor = (memeId, color) ->
                # ปุ่มจิ้มสี
                $scope.memeArray[memeId].color = color
                $scope.applyChange()
                return

            $scope.pickShadowColor = (memeId, color) ->
                # ปุ่มจิ้มเงา
                $scope.memeArray[memeId].shadowColor = color
                $scope.applyChange()
                return

            $scope.applyImage = (img) ->
                # ปุ่มรูปมีม
                $scope.selectedImage = img
                $scope.applyChange()

                # Scroll up when select an image
                $('body').animate { scrollTop: $canvasEl.position().top - 40 }, 600
                return

            $scope.reset = ->
                # ปุ่ม reset
                $scope.memeArray = originMeme

                # CLEAR
                originMeme = angular.copy($scope.memeArray)
                $scope.applyChange()
                return


            # Download Image
            $scope.saveAsImage = ->
                #var uri = cloneCanvas(canvas).toDataURL();
                $scope.repeatSwear true

                myInterval = setInterval((->
                    uri = $canvasEl[0].toDataURL()
                    downloadImage uri, 'Balltoro-haha_' + randomName()
                    $scope.repeatSwear false
                    clearInterval myInterval
                    return
                ), 10)
                return

            $scope.repeatSwear = (wantReplace) ->
                if wantReplace
                    keepRestoreText = []
                    #clear
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

            $canvasEl.dblclick (e) ->
                handleMouseDown e
                $input = $('#txt' + selectedText)

                $input.focus()
                # ทำการ setFocus
                $input.select()
                # ทำการ SelectAll
                handleMouseUp e
                return

            # Get swear words
            promise = $http
                type: 'GET'
                url: '/swears'

            promise.then (xhr) ->
                swearWords = JSON.parse(xhr.data.sw)

            $('.colorpicker')
                .colorpicker()
                .on 'changeColor', ->
                    color = $(@).data('colorpicker').getValue()
                    $scope.pickFontColor $(@).data('memeid'), color

    ]
