define(['toro/ng', 'toro/canvas', 'toro/config'], function(ToroNg, CanvasHelper, Config) {
  return ToroNg.controller('MainController', [
    '$scope', '$http', function($scope, $http) {
      var $canvasEl, activedDragText, canvasHelper, downloadImage, getMousePos, handleMouseDown, handleMouseMove, handleMouseUp, keepRestoreText, originMeme, promise, replaceText, startX, startY, swearWords, textHittest;
      new Config($scope);
      startX = 0;
      startY = 0;
      activedDragText = -1;
      $scope.$canvasEl = $canvasEl = angular.element($scope.config.canvasSelector);
      $scope.selectedImage = $canvasEl.data('def');
      $scope.imgWidth = $scope.config.image.width;
      $scope.imgHeight = $scope.config.image.height;
      $scope.activedMemeText = 0;
      $scope.memeArray = $scope.config.texts;
      $scope.fonts = $scope.config.fonts;
      $scope.fontSizes = $scope.config.fontSizes;
      $scope.fontStyles = $scope.config.fontStyles;
      $scope.colorPalette = $scope.config.colors;
      $scope.activedAttr = $scope.memeArray[$scope.activedMemeText];
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
      textHittest = function(x, y, textIndex) {
        var hitLessAlign, hitLessWidth, hitMoreDown, hitMoreUp, text;
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
        var i, j, len, mouseXT, mouseYT, newWidth, ratio, ref, results, text;
        e.preventDefault();
        newWidth = $canvasEl.width();
        ratio = newWidth / $scope.imgWidth;
        mouseXT = parseInt(getMousePos(e).x / ratio);
        mouseYT = parseInt(getMousePos(e).y / ratio);
        startX = mouseXT;
        startY = mouseYT;
        ref = $scope.memeArray;
        results = [];
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          text = ref[i];
          if (textHittest(startX, startY, i)) {
            console.log(i);
            if (text.dragable === true) {
              $scope.$apply(function() {
                return $scope.activedMemeText = i;
              });
              results.push(activedDragText = i);
            } else {
              results.push(void 0);
            }
          } else {
            results.push(void 0);
          }
        }
        return results;
      };
      handleMouseMove = function(e) {
        var dx, dy, mouse, mouseX, mouseXT, mouseY, mouseYT, newWidth, ratio, text;
        if (activedDragText < 0) {
          return;
        }
        e.preventDefault();
        mouse = getMousePos(e);
        mouseX = mouse.x;
        mouseY = mouse.y;
        text = $scope.memeArray[activedDragText];
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
        activedDragText = -1;
      };
      downloadImage = function(uri, name) {
        var $area, $link, link;
        $area = angular.element($scope.config.downloadLinkSelector);
        $link = angular.element('<a>');
        $link.on('click', function() {
          return $link.remove();
        });
        $area.append($link);
        link = $link[0];
        link.download = name;
        link.href = uri;
        link.innerHTML = $scope.config.clickToDownload;
        link.target = '_new';
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
      $scope.applyAttr = function(memeId, attr, value) {
        $scope.memeArray[memeId][attr] = value;
        $scope.applyChange();
      };
      $scope.applyImage = function(image) {
        var $state, img;
        img = new Image;
        img.setAttribute('crossOrigin', 'anonymous');
        img.src = image;
        $state = angular.element($scope.config.canvasStateSelector);
        $state.addClass('loading');
        img.onload = function(e) {
          $state.removeClass('loading');
          $scope.selectedImage = image;
          return $scope.applyChange();
        };
        $('body').animate({
          scrollTop: $canvasEl.position().top - 40
        }, 600);
      };
      $scope.memeActive = function(index) {
        return $scope.activedMemeText = index;
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
          downloadImage(uri, 'balltoro-haha-' + (new Date()).getTime());
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
      promise = $http({
        type: 'GET',
        url: '/swears'
      });
      promise.then(function(xhr) {
        return swearWords = JSON.parse(xhr.data.sw);
      });
      $scope.spectrumOptions = {
        showPaletteOnly: true,
        togglePaletteOnly: true,
        togglePaletteMoreText: 'More',
        togglePaletteLessText: 'Less',
        preferredFormat: 'hex',
        color: $scope.activedAttr.fontColor,
        palette: $scope.colorPalette
      };
      $scope.$watch('fontColor', function(value) {
        return $scope.applyAttr($scope.activedMemeText, 'fontColor', value || '#ffffff');
      });
      $scope.$watch('fontSize', function(value) {
        if (!value) {
          return;
        }
        return $scope.applyAttr($scope.activedMemeText, 'fontSize', value);
      });
      $scope.$watch('fontStyle', function(value) {
        return $scope.applyAttr($scope.activedMemeText, 'fontStyle', value || 'normal');
      });
      $scope.$watch('fontFace', function(value) {
        if (!value) {
          return;
        }
        return $scope.applyAttr($scope.activedMemeText, 'fontFace', value);
      });
      return $scope.$watch('activedMemeText', function(activeIndex) {
        var attr;
        $scope.activedAttr = attr = $scope.memeArray[activeIndex];
        $scope.fontColor = attr.fontColor;
        $scope.fontFace = attr.fontFace;
        $scope.fontStyle = attr.fontStyle;
        $scope.fontSize = attr.fontSize;
        return $('txt' + activeIndex).focus();
      });
    }
  ]);
});
