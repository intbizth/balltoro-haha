define(['toro/ng', 'toro/canvas', 'toro/config'], function(ToroNg, CanvasHelper, Config) {
  return ToroNg.controller('MainController', [
    '$scope', '$http', function($scope, $http) {
      var $canvasEl, canvasHelper, canvasOffset, downloadImage, getMousePos, handleMouseDown, handleMouseMove, handleMouseUp, keepRestoreText, offsetX, offsetY, originMeme, promise, randomName, replaceText, scrollX, scrollY, selectHighlight, selectedText, startX, startY, swearWords, textHittest;
      new Config($scope);
      selectedText = -1;
      startX = 0;
      startY = 0;
      $scope.$canvasEl = $canvasEl = angular.element($scope.config.canvasSelector);
      $scope.selectedImage = $canvasEl.data('def');
      $scope.imgWidth = $scope.config.image.width;
      $scope.imgHeight = $scope.config.image.height;
      $scope.fontFace = $scope.config.fontFace;
      $scope.selectedMemeText = 0;
      $scope.memeArray = $scope.config.texts;
      $scope.fontList = $scope.config.fontList;
      $scope.colors = $scope.config.colors;
      $scope.shadows = $scope.config.shadows;
      canvasOffset = $canvasEl.offset();
      offsetX = canvasOffset.left;
      offsetY = canvasOffset.top;
      scrollX = $canvasEl.scrollLeft();
      scrollY = $canvasEl.scrollTop();
      keepRestoreText = [];
      swearWords = {};
      canvasHelper = new CanvasHelper($scope);
      originMeme = angular.copy($scope.memeArray);
      replaceText = function(string) {
        var re, replacement, word;
        for (word in swearWords) {
          replacement = swearWords[word];
          re = new RegExp(word, 'gi');
          if (re.test(string)) {
            string = string.replace(re, replacement);
          }
        }
        return string;
      };
      selectHighlight = function(index) {
        var blinkInterval, keepBorder, myInterval, startBorder;
        keepBorder = $scope.memeArray[index].border;
        startBorder = 80;
        $($('.blink')[index]).addClass('blink-effect');
        blinkInterval = setInterval((function() {
          $($('.blink')[index]).removeClass('blink-effect');
          clearInterval(blinkInterval);
        }), 500);
        myInterval = setInterval((function() {
          if (startBorder > keepBorder) {
            $scope.memeArray[index].border = startBorder;
            canvasHelper.draw();
            startBorder -= 5;
          } else {
            clearInterval(myInterval);
            $scope.memeArray[index].border = keepBorder;
          }
        }), 10);
      };
      textHittest = function(x, y, textIndex) {
        var hitLessAlign, hitLessWidth, hitMoreDown, hitMoreUp, newHeight, newWidth, text;
        text = $scope.memeArray[textIndex];
        hitMoreUp = 60;
        hitMoreDown = 10;
        hitLessAlign = 0;
        hitLessWidth = 0;
        switch (text.align) {
          case 'left':
            hitLessAlign = 0;
            break;
          case 'center':
            hitLessAlign = text.w / 2 + 80;
            hitLessWidth = text.w - hitLessAlign;
            break;
          case 'right':
            hitLessAlign = text.w;
            hitLessWidth = text.w;
        }
        newWidth = $canvasEl.width();
        newHeight = $canvasEl.height();
        return x >= text.x - hitLessAlign && x <= text.x + text.w - hitLessWidth && y >= text.y - hitMoreUp && y <= text.h + hitMoreDown;
      };
      getMousePos = function(evt) {
        var rect;
        rect = $canvasEl[0].getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      };
      handleMouseDown = function(e) {
        var i, mouseXT, mouseYT, newWidth, ratio;
        e.preventDefault();
        newWidth = $canvasEl.width();
        ratio = newWidth / $scope.imgWidth;
        mouseXT = parseInt(getMousePos(e).x / ratio);
        mouseYT = parseInt(getMousePos(e).y / ratio);
        startX = mouseXT;
        startY = mouseYT;
        i = 0;
        while (i < $scope.memeArray.length) {
          if (textHittest(startX, startY, i)) {
            if ($scope.memeArray[i].dragable === true) {
              selectHighlight(i);
              $scope.$apply(function() {
                $scope.selectedMemeText = i;
              });
              selectedText = i;
            }
          }
          i++;
        }
      };
      handleMouseMove = function(e) {
        var dx, dy, mouse, mouseX, mouseXT, mouseY, mouseYT, newWidth, ratio, text;
        if (selectedText < 0) {
          return;
        }
        e.preventDefault();
        mouse = getMousePos(e);
        mouseX = mouse.x;
        mouseY = mouse.y;
        text = $scope.memeArray[selectedText];
        newWidth = $canvasEl.width();
        ratio = newWidth / $scope.imgWidth;
        mouseXT = parseInt(mouseX / ratio);
        mouseYT = parseInt(mouseY / ratio);
        dx = mouseXT - startX;
        dy = mouseYT - startY;
        startX = mouseXT;
        startY = mouseYT;
        text.x += dx;
        text.y += dy;
        canvasHelper.draw();
      };
      handleMouseUp = function(e) {
        e.preventDefault();
        selectedText = -1;
      };
      randomName = function() {
        var i, n;
        n = [];
        i = 0;
        while (i < 5) {
          n.push(Math.floor(Math.random() * 16).toString(16));
          i++;
        }
        return n.join('');
      };
      downloadImage = function(uri, name) {
        var link;
        link = angular.element('<a>')[0];
        link.download = name;
        link.href = uri;
        return link.click();
      };
      $scope.applyChange = function() {
        canvasHelper.draw();
      };
      $scope.numRange = function(start, end, skip) {
        var i, num;
        num = [];
        i = start;
        while (i <= end) {
          num.push(i);
          i += skip;
        }
        return num;
      };
      $scope.txtAlign = function(memeId, align) {
        $scope.memeArray[memeId].align = align;
        $scope.applyChange();
      };
      $scope.txtSize = function(memeId, size) {
        $scope.memeArray[memeId].size = size;
        $scope.applyChange();
      };
      $scope.pickFontColor = function(memeId, color) {
        $scope.memeArray[memeId].color = color;
        $scope.applyChange();
      };
      $scope.pickShadowColor = function(memeId, color) {
        $scope.memeArray[memeId].shadowColor = color;
        $scope.applyChange();
      };
      $scope.applyImage = function(img) {
        $scope.selectedImage = img;
        $scope.applyChange();
        $('body').animate({
          scrollTop: $canvasEl.position().top - 40
        }, 600);
      };
      $scope.reset = function() {
        $scope.memeArray = originMeme;
        originMeme = angular.copy($scope.memeArray);
        $scope.applyChange();
      };
      $scope.saveAsImage = function() {
        var myInterval;
        $scope.repeatSwear(true);
        myInterval = setInterval((function() {
          var uri;
          uri = $canvasEl[0].toDataURL();
          downloadImage(uri, 'Balltoro-haha_' + randomName());
          $scope.repeatSwear(false);
          clearInterval(myInterval);
        }), 10);
      };
      $scope.repeatSwear = function(wantReplace) {
        var i;
        if (wantReplace) {
          keepRestoreText = [];
          i = 0;
          while (i < $scope.memeArray.length) {
            keepRestoreText.push($scope.memeArray[i].memeText);
            $scope.memeArray[i].memeText = replaceText($scope.memeArray[i].memeText);
            i++;
          }
        } else {
          i = 0;
          while (i < $scope.memeArray.length) {
            $scope.$apply(function() {
              $scope.memeArray[i].memeText = keepRestoreText[i];
            });
            i++;
          }
        }
        return $scope.applyChange();
      };
      canvasHelper.draw();
      $canvasEl.mousedown(handleMouseDown);
      $canvasEl.mousemove(handleMouseMove);
      $canvasEl.mouseup(handleMouseUp);
      $canvasEl.mouseout(handleMouseUp);
      $canvasEl.dblclick(function(e) {
        var $input;
        handleMouseDown(e);
        $input = $('#txt' + selectedText);
        $input.focus();
        $input.select();
        handleMouseUp(e);
      });
      promise = $http({
        type: 'GET',
        url: '/swears'
      });
      promise.then(function(xhr) {
        return swearWords = JSON.parse(xhr.data.sw);
      });
      return $('.colorpicker').colorpicker().on('changeColor', function() {
        var color;
        color = $(this).data('colorpicker').getValue();
        return $scope.pickFontColor($(this).data('memeid'), color);
      });
    }
  ]);
});
