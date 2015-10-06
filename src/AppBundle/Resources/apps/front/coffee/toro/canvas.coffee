define ->
    Canvas = ($scope) ->
        @scope = $scope
        return @

    Canvas::drawText = (ctx, ARR, x, y) ->
        $scope = @scope
        #Set the text styles
        ARR.memeText = ARR.memeText.toString().toUpperCase()
        ctx.font = 'bold ' + ARR.size + 'px ' + $scope.fontFace.name
        ctx.fillStyle = ARR.color
        ctx.textAlign = ARR.align
        #ชิดซ้ายขวา?
        #text shadow
        #ctx.shadowColor = ARR.shadowColor;
        #ctx.shadowOffsetX = 3;
        #ctx.shadowOffsetY = 2;
        #ctx.shadowBlur = 3;
        #ctx.globalAlpha = 0.6; //Opacity
        ctx.textBaseline = 'middle'
        #ctx.lineWidth = ARR.border;
        #ctx.strokeStyle = "#000";
        lineheight = ARR.size * 1.3
        #ความสูงของบรรทัด //50
        lines = ARR.memeText.toString().split('\n')
        #ตัด \n ลง Array
        #set hitbox bound for Drag
        metrics = ctx.measureText(ARR.memeText)
        wdth = metrics.width
        ARR.w = wdth
        #เปลี่ยนความยาว hitbox
        ARR.h = y + lineheight * lines.length
        #hit box hight (น่าจะมีสูตรที่ดีกว่านี้) // y + lineheight * lines.length;
        #===========Align==========//

        ###
        switch(ARR.align){
            case "left": x = 20; break;
            case "center": x = $scope.imgWidth / 2; break;
            case "right": x = $scope.imgWidth - 20; break;
        }
        console.log('wd'+wdth);
        ###

        #===================//
        #  console.log('x:' + x + ' y:' + y);
        i = 0
        while i < lines.length
            #ctx.strokeText(lines[i], x, y + (i*lineheight)); //เงาก่อน
            ctx.fillText lines[i], x, y + i * lineheight
            #text with newline
            i++
        return

    Canvas::draw = ->
        $scope = @scope
        img = new Image
        #MemeBackground
        toro = new Image
        toro.src = 'data:image/png;base64,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'
        img.setAttribute 'crossOrigin', 'anonymous'
        #บรรทัดนี้ทำให้งานมีปัญหา แต่ถ้าไม่มีก็เซิฟภาพไม่ได้ //This is a CORS issue
        canvas = $scope.$canvasEl[0]
        newWidth = canvas.offsetWidth
        #get current Width when canvas responsive to smaller
        #console.log('NW: '+newWidth);
        ctx = canvas.getContext('2d')
        width = width or $scope.imgWidth
        height = $scope.imgHeight
        img.src = $scope.selectedImage

        img.onload = (e) =>
            canvas.width = width
            canvas.height = height
            ctx.scale 1, 1
            ctx.clearRect 0, 0, canvas.width, canvas.height

            # Clear Canvas ก่อน
            ctx.drawImage img, 0, 0, $scope.imgWidth, $scope.imgHeight

            # ลงรูป
            ctx.drawImage toro, 20, 20, 90, 80

            # ลง logo balltoro
            i = 0

            while i < $scope.memeArray.length
                # ทำซ้ำตาม จน. ข้อความ
                @drawText ctx, $scope.memeArray[i], $scope.memeArray[i].x, $scope.memeArray[i].y
                i++
            return

        return

    return Canvas
