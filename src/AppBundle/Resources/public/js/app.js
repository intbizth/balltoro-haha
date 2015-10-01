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
    $scope.imgWidth = 500; //Default scale
    $scope.font_face = 'Impact';

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
    memeText: "บอลโตโร่",
    x: 250, y: 70, w: 0, h: 0, align: "center", size: 60, color: '#FFFFFF', shadowColor: '#000000', dragable: true
},
{
    memeText: "เป็ด",
    x: 250, y: 400, w: 0, h: 0, align: "center", size: 50, color: '#d40023', shadowColor: '#000000', dragable: true
},
{
    memeText: "www.Balltoro.com",
    x: 490, y: 480, w: 0, h: 0, align: "right", size: 22, color: '#FFFFFF', shadowColor: '#000000', dragable: false
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

//==============Color List=================//
    $scope.colors = ['#FFFFFF', '#000000', '#d40023', '#dae500', '#216cb6'];
    $scope.shadows = ['#FFFFFF', '#000000'];

//============Meme list=============//
    $scope.memeList =  [
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

//============== DRAW ==============//

function draw() {
    var img = new Image();
    img.setAttribute('crossOrigin','anonymous'); //This is a CORS issue

    //var canvas = document.getElementById("canvas");
    var canvas = angular.element('#canvas')[0];
    var ctx = canvas.getContext("2d"),
            width = width || $scope.imgWidth,
            height = width || 500,
            //Scale
            _w = 500, _h = 500;
    img.src= $scope.selectedImage;

    img.onload = function() {
        canvas.width = width;
        canvas.height = height;

        ctx.scale(width/500, height/500);
        ctx.clearRect(0, 0, canvas.width, canvas.height); //Clear Canvas ก่อน
        ctx.drawImage(this, 0, 0, _w, _h); //ลงรูป

        for (var i = 0; i < $scope.memeArray.length; i++) { //ทำซ้ำตาม จน. ข้อความ
            $scope.drawText(ctx, $scope.memeArray[i], $scope.memeArray[i].x, $scope.memeArray[i].y);
        }
    }
}

    $scope.drawText = function(ctx, ARR, x, y) {
        //Set the text styles
        ARR.memeText = ARR.memeText.toString().toUpperCase();
        //ARR.memeText = _(ARR.memeText);

        ctx.font = "bold " + ARR.size + "px "+$scope.font_face.name;
        ctx.fillStyle = ARR.color;
        ctx.textAlign = ARR.align; //ชิดซ้ายขวา?

        //text shadow
        ctx.shadowColor = ARR.shadowColor;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 3;
        //ctx.globalAlpha = 0.6; //Opacity
        ctx.textBaseline = "middle";
        ctx.lineWidth = 7;
        ctx.strokeStyle = "#000";

        var lineheight = ARR.size*1.3; //ความสูงของบรรทัด //50
        var lines = ARR.memeText.toString().split('\n'); //ตัด \n ลง Array

        for (var i = 0; i<lines.length; i++) {
        ctx.strokeText(lines[i], x, y + (i*lineheight)); //เงาก่อน
        ctx.fillText(lines[i], x, y + (i*lineheight) ); //text with newline

        //set hitbox bound for Drag
        var metrics = ctx.measureText(ARR.memeText);
        var wdth = metrics.width;
        ARR.w = wdth; //เปลี่ยนความยาว hitbox
        ARR.h = y + lineheight * lines.length; //hit box hight (น่าจะมีสูตรที่ดีกว่านี้) // y + lineheight * lines.length;
        }
    }

//============== Hittest ==============//
function textHittest(x, y, textIndex) {
    var text = $scope.memeArray[textIndex];
    var hitMoreUp = 50; //เผื่อ hit บน
    var hitMoreDown = 20;//$scope.font_size*1.3; //เผื่อ hit ลง
    var hitLessAlign = 0; //ขยาย hitbox ไปทางซ้าย กรณีชิด ช่น ชิดซ้าย=0; ชิดกลาง= ย่นไปครึ่ง;
    var hitLessWidth = 0; //ลดความกว้างของ hitbox กรณีชิด

    switch (text.align){
        case "left": hitLessAlign = 0; break;
        case "center": hitLessAlign = text.w / 2; hitLessWidth = text.w - hitLessAlign; break;
        case "right": hitLessAlign = text.w; hitLessWidth = text.w; break;
    }
    console.log('newWidth:'+hitLessAlign);
    console.log('align:'+text.w);

    return (x >= (text.x - hitLessAlign) && x <= text.x + (text.w - hitLessWidth) && y >= (text.y - hitMoreUp) && y <= (text.h+hitMoreDown));
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
    startX = getMousePos(e).x; //pageX
    startY = getMousePos(e).y;

    for (var i = 0; i < $scope.memeArray.length; i++) {
        if (textHittest(startX, startY, i)) {
            if ($scope.memeArray[i].dragable == true) selectedText = i; //ลากได้ไหม ยกเว้นเครดิต
        }
    }
}

function handleMouseMove(e) {
    if (selectedText < 0) { return; }
    e.preventDefault();
    mouseX = getMousePos(e).x;
    mouseY = getMousePos(e).y;

    // Put your mousemove stuff here
    var dx = mouseX - startX;
    var dy = mouseY - startY;
    startX = mouseX;
    startY = mouseY;

    var text = $scope.memeArray[selectedText];
    text.x += dx;
    text.y += dy;
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
