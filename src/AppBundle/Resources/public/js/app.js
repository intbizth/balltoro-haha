/* {{}} usage on symfony : {{ '{{font_face.name}}' }} */

app = angular.module('haha',[]);
/*app.config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{{').endSymbol('}}');
});*/
app.controller('ToroHaha',function($scope) {
//==================================
//CrossOrigin : line 118

//========== Startup var ==========//
    $scope.selectedImage = 'http://i.imgur.com/WA5duA1.jpg';
    $scope.imgWidth = 1200; //Default scale
    $scope.imgHeight = 628;
    $scope.font_face = 'FreesiaUPC';
    $scope.selectedMemeText = 0;

    var $canvas = $("#canvas");
    var canvasOffset = $canvas.offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var scrollX = $canvas.scrollLeft();
    var scrollY = $canvas.scrollTop();

    //เก็บตำแหน่ง cursor
    var startX;
    var startY;

    var selectedText = -1;
//================= Meme properties array ==================//
$scope.memeArray = [
        {
            memeText: "\"เฮียมูจ๋า\"",
            x: 840, y: 178, w: 0, h: 0, align: "center", size: 85, color: '#FFFFFF', shadowColor: '#000000', border: 8, dragable: true
        },
        {
            memeText: "อย่าจากผมไป",
            x: 840, y: 375, w: 0, h: 0, align: "center", size: 50, color: '#FFFFFF', shadowColor: '#000000', border: 8, dragable: true
        },
        {
            memeText: "balltoro.com",
            x: 20, y: 600, w: 0, h: 0, align: "left", size: 22, color: '#FFFFFF', shadowColor: '#000000', border: 2, dragable: false
        }];

//=================Font list======================//
        $scope.fontList = [
    {
        name: 'Impact'
    },
    {
        name: 'Comic Sans MS'
    },
    {
        name: 'FreesiaUPC'
    }
    ];
$scope.fontList2 = ['Impact','Comic Sans MS','FreesiaUPC'   ]; //กรณี 2

//============ font size =============//
$scope.numRange = function(start, end, skip) {
    var num = [];
    for (var i = start; i <= end; i+=skip) {
        num.push(i);
    }
    return num;
};

//==============Color List=================//
    $scope.colors = ['#FFFFFF', '#000000', '#d40023', '#dae500', '#216cb6'];
    $scope.shadows = ['#FFFFFF', '#000000'];

//============Meme list=============//
//This Array contain image and 'template' where are text is in each images
    $scope.memeList =  [
    {
        id: 1,
        name: 'img1',
        path: 'img/1.png',
        text1_locate: 'middle-right',
        text2_locate: 'middle-center',
        credit_locate: 'bottom-left'
    },
    {
        id: 2,
        name: 'img2',
        path: 'img/2.png'
    },
    {
        id: 3,
        name: 'img3',
        path: 'img/tL47qtp.jpg'
    },
    {
        id: 4,
        name: 'img4',
        path: 'http://www.lijsoccer.com/images/soccerBall.png'
    },
    {
        id: 5,
        name: 'img4',
        path: 'http://i.imgur.com/WA5duA1.jpg'
    },
    {
        id: 6,
        name: 'Aaand It\'s Gone',
        path: 'http://i.imgur.com/yf12saq.jpg'
    },
    {
        id: 7,
        name: 'Actual Advice Mallard',
        path: "http://i.imgur.com/WymFmVy.jpg"
    },
    {
        id: 8,
        name: "Advice Dog",
        path: "http://i.imgur.com/Qk0VO6D.jpg"
    },
    {
        id: 9,
        name: "Almost Politically Correct Redneck",
        path: "http://i.imgur.com/YqLgINf.jpg"
    },
    {
        id: 10,
        name: "Am I The Only One",
        path: "http://i.imgur.com/gS9YL5U.jpg"
    }
    ];

//===============Apply event================//
var forReset = angular.copy($scope.memeArray); //duplicate value for reset button
draw(); // call function at startup
$scope.applyChange = function(){ draw(); }

$scope.applyPosition = function(index){
    var tx1 = $scope.memeList[index].text1_locate.split('-');
    var tx2 = $scope.memeList[index].text2_locate.split('-');
    var credit = $scope.memeList[index].credit_locate.split('-');

    for (var i=0; i< tx1.length; i++){
        var _meme = $scope.memeArray[index];
        switch (tx1[i]){
            case 'left': _meme.x = 50; break;
            case 'center': _meme.x = $scope.imgWidth / 2; break;
            case 'right': _meme.x = 800; break;
            case 'top': _meme.y = 20; break;
            case 'middle': _meme.y = $scope.imgHeight / 2; break;
            case 'bottom': _meme.y = $scope.imgHeight - 30; break;
        }

    }
draw();
}

//============== DRAW ==============//

function draw() {
    var img = new Image(); //MemeBackground
    var toro = new Image();
    toro.src = "data:image/png;base64,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";

    //img.setAttribute('crossOrigin','anonymous'); //บรรทัดนี้ทำให้งานมีปัญหา แต่ถ้าไม่มีก็เซิฟภาพไม่ได้ //This is a CORS issue

    var canvas = document.getElementById("canvas");
    var newWidth = canvas.offsetWidth; //get current Width when canvas responsive to smaller
    //console.log('NW: '+newWidth);

    var ctx = canvas.getContext("2d"),
            width = width || $scope.imgWidth,
            height = $scope.imgHeight,
            //Scale
            _w = $scope.imgWidth , _h = $scope.imgHeight;
        img.src= $scope.selectedImage;

        img.onload = function() {
            canvas.width = width;
            canvas.height = height;

            ctx.scale(1, 1);
            ctx.clearRect(0, 0, canvas.width, canvas.height); //Clear Canvas ก่อน
            ctx.drawImage(this, 0, 0, _w, _h); //ลงรูป
            ctx.drawImage(toro, 20, 90, 90, 80); //ลง logo balltoro

            for (var i = 0; i < $scope.memeArray.length; i++) { //ทำซ้ำตาม จน. ข้อความ
            //$scope.drawText(ctx, $scope.memeArray[i], $scope.memeArray[i].x, $scope.memeArray[i].y);
            $scope.drawText(ctx, $scope.memeArray[i], $scope.memeArray[i].x, $scope.memeArray[i].y);
            }
    }
}

    $scope.drawText = function(ctx, ARR, x, y) {
        //Set the text styles
        ARR.memeText = ARR.memeText.toString().toUpperCase();
        ctx.font = "bold " + ARR.size + "px "+$scope.font_face.name;
        ctx.fillStyle = ARR.color;
        ctx.textAlign = ARR.align; //ชิดซ้ายขวา?

        //text shadow
        //ctx.shadowColor = ARR.shadowColor;
        //ctx.shadowOffsetX = 3;
        //ctx.shadowOffsetY = 2;
        //ctx.shadowBlur = 3;

        //ctx.globalAlpha = 0.6; //Opacity
        ctx.textBaseline = "middle";
        //ctx.lineWidth = ARR.border;
        //ctx.strokeStyle = "#000";

        var lineheight = ARR.size*1.3; //ความสูงของบรรทัด //50
        var lines = ARR.memeText.toString().split('\n'); //ตัด \n ลง Array
                //set hitbox bound for Drag
        var metrics = ctx.measureText(ARR.memeText);
        var wdth = metrics.width;
        ARR.w = wdth; //เปลี่ยนความยาว hitbox
        ARR.h = y + lineheight * lines.length; //hit box hight (น่าจะมีสูตรที่ดีกว่านี้) // y + lineheight * lines.length;

        //===========Align==========//
        /*
        switch(ARR.align){
            case "left": x = 20; break;
            case "center": x = $scope.imgWidth / 2; break;
            case "right": x = $scope.imgWidth - 20; break;
        }
        console.log('wd'+wdth);
        */
        //===================//
        //  console.log('x:' + x + ' y:' + y);

        for (var i = 0; i<lines.length; i++) {
        //ctx.strokeText(lines[i], x, y + (i*lineheight)); //เงาก่อน
        ctx.fillText(lines[i], x, y + (i*lineheight) ); //text with newline

        }
    }

    function selectHighlight(index){
        var keepBorder = $scope.memeArray[index].border;
        var startBorder = 80;

        //=== blink panel ===//
        $($(".blink")[index]).addClass("blink-effect");
        var blinkInterval = setInterval(function(){ $($(".blink")[index]).removeClass("blink-effect"); clearInterval(blinkInterval);},500);
        //$("#txt"+index).focus(); //ทำการ setFocus
        //$("#txt"+index).select(); //ทำการ SelectAll

        //=== animate selected text border ===//
        var myInterval = setInterval(function(){
            if (startBorder > keepBorder){
                $scope.memeArray[index].border = startBorder;
                draw();
                startBorder-= 5;
            }
            else
            {
                clearInterval(myInterval);
                $scope.memeArray[index].border = keepBorder;
            }

        }, 10);
    }
//============== Hittest ==============//
function textHittest(x, y, textIndex) {
    var text = $scope.memeArray[textIndex];
    var hitMoreUp = 60; //เผื่อ hit บน
    var hitMoreDown = 10;//$scope.font_size*1.3; //เผื่อ hit ลง
    var hitLessAlign = 0; //ขยาย hitbox ไปทางซ้าย กรณีชิด ช่น ชิดซ้าย=0; ชิดกลาง= ย่นไปครึ่ง;
    var hitLessWidth = 0; //ลดความกว้างของ hitbox กรณีชิด

    switch (text.align){
        case "left": hitLessAlign = 0; break;
        case "center": hitLessAlign = text.w / 2 + 80; hitLessWidth = text.w - hitLessAlign; break;
        case "right": hitLessAlign = text.w; hitLessWidth = text.w; break;
    }

    //===============
    var canvas = document.getElementById("canvas");
    var newWidth = canvas.offsetWidth;
    var newHeight = canvas.offsetHeight;


    console.log('newWidth:'+hitLessAlign);
    console.log('align:'+text.w);

    return (x >= (text.x - hitLessAlign) && x <= text.x + (text.w - hitLessWidth) && y >= (text.y - hitMoreUp) && y <= (text.h+hitMoreDown));
    //return (x >= (text.x - hitLessAlign) && x <= text.x + (text.w - hitLessWidth) && y >= (text.y - hitMoreUp) && y <= (text.h+hitMoreDown));
    //[ เริ่ม x กว้างถึง width ---- width]
    //[ y | | | | height]
}

//==============Drag control=============//
//return cursor pos in canvas
function getMousePos(evt) {
    var canvas = document.getElementById('canvas');
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }

function handleMouseDown(e) {
    e.preventDefault();

    //calculate scale of canvas that smaller in responsive
    var canvas = document.getElementById("canvas");
    var newWidth = canvas.offsetWidth;
    var ratio = newWidth / $scope.imgWidth; //น้อยหารมาก
    var mouseXT = parseInt((getMousePos(e).x) / ratio);
    var mouseYT = parseInt((getMousePos(e).y) / ratio);
    startX = mouseXT; //pageX
    startY = mouseYT;

    //check what am i clicking
    for (var i = 0; i < $scope.memeArray.length; i++) {
        if (textHittest(startX, startY, i)) {
            if ($scope.memeArray[i].dragable == true){
                selectHighlight(i);
                $scope.$apply(function(){$scope.selectedMemeText = i;}); //เปลี่ยน ค่าต่างใน element panel
                selectedText = i; //ลากได้ไหม ยกเว้นเครดิต
            }
        }
    }
}

function handleMouseMove(e) {
    if (selectedText < 0) { return; }
    e.preventDefault();
    mouseX = getMousePos(e).x;
    mouseY = getMousePos(e).y;

    var text = $scope.memeArray[selectedText];

    //Find Scale of responsive canvas
    var canvas = document.getElementById("canvas");
    var newWidth = canvas.offsetWidth;
    var ratio = newWidth / $scope.imgWidth; //น้อยหารมาก

    var mouseXT = parseInt((mouseX) / ratio);
    var mouseYT = parseInt((mouseY) / ratio);

    var dx = mouseXT - startX;
    var dy = mouseYT - startY;
    startX = mouseXT;
    startY = mouseYT;

    text.x += dx;
    text.y += dy;


    console.log('ratio:' + ratio);
    draw(); //apply
}

function handleMouseUp(e) {
    e.preventDefault();
    selectedText = -1;
}

//============listen for mouse events================//
$("#canvas").mousedown(function (e) {
    handleMouseDown(e);
});
$("#canvas").mousemove(function (e) {
    handleMouseMove(e);
});
$("#canvas").mouseup(function (e) {
    handleMouseUp(e);
});
$("#canvas").mouseout(function (e) {
    handleMouseUp(e); //ใช้เดียวกัน
});
$( "#canvas" ).dblclick(function(e) {
    handleMouseDown(e);
    $("#txt"+selectedText).focus(); //ทำการ setFocus
    $("#txt"+selectedText).select(); //ทำการ SelectAll
    handleMouseUp(e);
});


//============== HTML button event ===============//
    $scope.txtAlign = function(index, align){ //ปุ่มจัดชิด
        $scope.memeArray[index].align = align;
        //ย้ายตำแหน่งให้ดูเหมือนอยู่ที่เดิม
        /*
        switch (align){
            case "left": memeArray[index].x = 0; break;//(memeArray[index].w/2) - 125; break;
            case "center": memeArray[index].x = 250; break;
            case "right": memeArray[index].x = 500 - (memeArray[index].w - 400); break; //ไม่สามารถช
        }*/
        $scope.applyChange();
    }

    $scope.txtSize = function(index, size){ //ปุ่มปรับขนาด
        $scope.memeArray[index].size = size;
        $scope.applyChange();
    }

    $scope.pickFontColor = function (index, color) { //ปุ่มจิ้มสี
        $scope.memeArray[index].color = color;
        $scope.applyChange();
    };

    $scope.pickShadowColor = function(index, color) { //ปุ่มจิ้มเงา
        $scope.memeArray[index].shadowColor = color;
        $scope.applyChange();
    };

    $scope.applyImage = function(img){ //ปุ่มรูปมีม
        $scope.selectedImage = img;
        $scope.applyChange();

        //Scroll up when select an image
        $('html, body').animate({
            scrollTop: $('#canvas').position().top - 40 }, 600);
    };

    $scope.reset = function(){ //ปุ่ม reset
        $scope.memeArray = forReset; //CLEAR
        forReset = angular.copy($scope.memeArray); //โยนค่าใหม่
        $scope.applyChange();
    };

//=================== Download Image ====================//
$scope.create = function() {
        //var uri = cloneCanvas(canvas).toDataURL();
        var uri;
        $scope.repeatSwear(true);

        var myInterval = setInterval(function(){
            uri = document.getElementById('canvas').toDataURL();
            downloadImage(uri,'Balltoro-haha_'+randomName());
            $scope.repeatSwear(false);
            clearInterval(myInterval);
        }, 10);
}

$scope.createClone = function() {
    var uri;
    $scope.repeatSwear(true);
    var myInterval = setInterval(function(){
        uri = cloneCanvas(canvas);
        downloadImage(uri, 'Balltoro-haha-'+randomName());

    })
}

    function randomName() {
        var n = [];
        for(var i =0; i < 5;i++) {
            n.push((Math.floor(Math.random() *16)).toString(16));
        }
        return n.join('');
    };
    function downloadImage(uri,name) {
        var link = document.createElement('a');
        link.download = name;
        link.href = uri;
        link.click();
        //$scope.repeatSwear(false); //คืนค่าคำหยาบ
    };
//===================================================//

//==================== swear Fix ====================//

var _, sw;
sw = {};
_ = function(string) {
  var re, replacement, word;
  for (word in sw) {
    replacement = sw[word];
    re = new RegExp(word, 'gi');
    if (re.test(string)) {
      string = string.replace(re, replacement);
    }
  }
  return string;
};

$.ajax({
  type: 'GET',
  url: '/swears',
  success: function(res) {
    return sw = json_decode(res.sw);
  }
});

var keepRestoreText = []; //Keep swear word for restore
$scope.repeatSwear = function(wantReplace) {
    if (wantReplace){
        keepRestoreText = []; //clear
        for (var i = 0; i < $scope.memeArray.length; i++) {

            keepRestoreText.push($scope.memeArray[i].memeText);
            $scope.memeArray[i].memeText = _($scope.memeArray[i].memeText);

        }
    }
    else
    {
        for (var i = 0; i < $scope.memeArray.length; i++) {
            $scope.$apply(function(){$scope.memeArray[i].memeText = keepRestoreText[i];});
            //$scope.memeArray[i].memeText = keepRestoreText[i];
        }
    }
    $scope.applyChange();

console.log(keepRestoreText);
/*
  var actorText, baseText, roback;
  baseText = _($scope.baseText);
  actorText = _($scope.actorText);
  $scope.clear();
  $scope.writeText(context, baseText);
  $scope.writeActor(context, actorText);
  roback = function() {
    $scope.clear();
    $scope.writeText(context, $scope.baseText);
    return $scope.writeActor(context, $scope.actorText);
  };
  if (isAppleMobile) {
    angular.element('<a target="_blank" style="visibility: hidden; position: absolute;"/>').attr('href', canvas.toDataURL('image/png'))[0].click();
    roback();
  }*/
};

//============================================//

function cloneCanvas(oldCanvas) {

    //create a new canvas
    var newCanvas = document.createElement('canvas');
    var context = newCanvas.getContext('2d');

    //set dimensions
    newCanvas.width = oldCanvas.width;
    newCanvas.height = oldCanvas.height;


    //apply the old canvas to the new one
    context.drawImage(oldCanvas, 0, 0);

    //return the new canvas
    return newCanvas;
}

});
app.run(function() {
});
