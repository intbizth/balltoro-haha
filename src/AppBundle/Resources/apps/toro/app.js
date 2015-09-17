define(['jquery', 'filesaver', 'angular', 'toro/json_decode'], function($, filesaver, angular, json_decode) {
  var _, canvas, context, ctrl, img, isAppleMobile, maxActorTextLineHeight, maxActorTextSize, maxTextLineHeight, maxTextSize, minActorTextLineHeight, minActorTextSize, minHeight, minTextLineHeight, minTextSize, minWidth, prefix, sw, textActorFont, textFont, textPadding, textScaleFactor, wrapText;
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
  minWidth = 320;
  minHeight = 320;
  textPadding = 50;
  maxTextSize = 100;
  minTextSize = 40;
  maxTextLineHeight = 120;
  minTextLineHeight = 40;
  maxActorTextSize = 60;
  minActorTextSize = 20;
  maxActorTextLineHeight = 80;
  minActorTextLineHeight = 40;
  textScaleFactor = 0.1;
  prefix = 'balltoro-haha-';
  textFont = 'CSChatThai';
  textActorFont = 'CSChatThai';
  canvas = angular.element('#canvas')[0];
  context = canvas.getContext('2d');
  wrapText = function(ctx, text, x, y, maxWidth, lineHeight) {
    var line, metrics, n, testLine, testWidth, words;
    words = text.split(' ');
    line = '';
    n = 0;
    while (n < words.length) {
      testLine = line + words[n] + ' ';
      metrics = ctx.measureText(testLine);
      testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
      n++;
    }
    ctx.fillText(line, x, y);
  };
  context.mozImageSmoothingEnabled = false;
  context.msImageSmoothingEnabled = false;
  context.imageSmoothingEnabled = false;
  img = new Image;
  img.setAttribute('crossOrigin', 'anonymous');
  img.src = 'http://i3.mirror.co.uk/incoming/article1829477.ece/ALTERNATES/s1227b/Reading-v-Liverpool-Premier-League.jpg';
  img.onload = function() {
    context.drawImage(img, 0, 0);
  };
  isAppleMobile = /i(pad|phone|pod)/gi.test(navigator.userAgent);
  angular.module('haha', []).controller('ToroHaha', ctrl = function($scope, $window) {
    var window;
    window = angular.element($window);
    window.bind('resize', function() {
      $scope.$apply();
    });
    $scope.baseText = '';
    $scope.actorText = '';
    $scope.$watch('baseText', function(n) {
      $scope.clear();
      $scope.writeText(context, n);
      $scope.writeActor(context, $scope.actorText);
    });
    $scope.$watch('actorText', function(n) {
      $scope.clear();
      $scope.writeActor(context, n);
      $scope.writeText(context, $scope.baseText);
    });
    $scope.$watch(function() {
      return {
        width: window.width(),
        height: window.height()
      };
    }, function(n, o) {
      $scope.calculateSize(n.width, n.height, o.height > n.height);
      $scope.clear();
      $scope.writeActor(context, $scope.actorText);
      $scope.writeText(context, $scope.baseText);
    }, true);
    $scope.saveAs = function() {
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
        return;
      }
      canvas.toBlobHD(function(blob) {
        filesaver(blob, prefix + (new Date).getTime() + '.png');
        roback();
      }, 'image/png');
    };
    $scope.clear = function() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0);
    };
    $scope.writeText = function(ctx, text) {
      if (!$scope.width) {
        return;
      }
      ctx.font = $scope.textSize + 'px \'' + textFont + '\'';
      ctx.textAlign = 'right';
      ctx.fillStyle = '#759E1A';
      wrapText(ctx, text, $scope.textX, $scope.textY, $scope.maxWidth, $scope.textLineHeight);
    };
    $scope.writeActor = function(ctx, text) {
      if (!$scope.width) {
        return;
      }
      ctx.font = $scope.actorTextSize + 'px \'' + textActorFont + '\'';
      ctx.textAlign = 'right';
      ctx.fillStyle = '#fff';
      wrapText(ctx, text, $scope.textActorX, $scope.textActorY, $scope.maxWidth, $scope.actorLineHeight);
    };
    $scope.paddingOffset = 0;
    $scope.width = minWidth;
    $scope.height = minHeight;
    $scope.calculateSize = function(w, h, smaller) {
      var height1, height2, size1, size2;
      $scope.width = canvas.width = w - $scope.paddingOffset;
      $scope.height = canvas.height = h - $scope.paddingOffset;
      $scope.maxWidth = $scope.width - textPadding;
      $scope.textX = $scope.width - textPadding;
      $scope.textY = 100;
      $scope.textActorX = $scope.width - textPadding;
      $scope.textActorY = $scope.height - 40;
      size1 = void 0;
      size2 = void 0;
      height1 = void 0;
      height2 = void 0;
      if (smaller) {
        if (!$scope.textSize) {
          $scope.textSize = minTextSize;
          $scope.actorTextSize = minActorTextSize;
          $scope.textLineHeight = minTextLineHeight;
          $scope.actorLineHeight = minActorTextLineHeight;
        }
        size1 = $scope.textSize - ($scope.textSize * textScaleFactor);
        size2 = $scope.actorTextSize - ($scope.actorTextSize * textScaleFactor);
        height1 = $scope.textLineHeight - ($scope.textLineHeight * textScaleFactor);
        height2 = $scope.actorLineHeight - ($scope.actorLineHeight * textScaleFactor);
        if (size1 < minTextSize) {
          size1 = minTextSize;
          size2 = minActorTextSize;
          height1 = minTextLineHeight;
          height2 = minActorTextLineHeight;
        }
        $scope.textSize = size1;
        $scope.actorTextSize = size2;
        $scope.textLineHeight = height1;
        $scope.actorLineHeight = height2;
      } else {
        if (!$scope.textSize) {
          $scope.textSize = maxTextSize;
          $scope.actorTextSize = maxActorTextSize;
          $scope.textLineHeight = maxTextLineHeight;
        }
        size1 = $scope.textSize + $scope.textSize * textScaleFactor;
        size2 = $scope.actorTextSize + $scope.actorTextSize * textScaleFactor;
        height1 = $scope.textLineHeight + $scope.textLineHeight * textScaleFactor;
        height2 = $scope.actorLineHeight + $scope.actorLineHeight * textScaleFactor;
        if (size1 > maxTextSize) {
          size1 = maxTextSize;
          size2 = maxActorTextSize;
          height1 = maxTextLineHeight;
          height2 = maxActorTextLineHeight;
        }
        $scope.textSize = size1;
        $scope.actorTextSize = size2;
        $scope.textLineHeight = height1;
        $scope.actorLineHeight = height2;
      }
    };
  });
  ctrl.$inject = ['$scope', '$window'];
});
