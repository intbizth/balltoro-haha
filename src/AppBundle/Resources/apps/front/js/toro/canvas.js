define(function() {
  var Canvas;
  Canvas = function($scope) {
    this.scope = $scope;
    return this;
  };
  Canvas.prototype.drawText = function(ctx, attr, x, y) {
    var i, j, len, line, lineHeight, lines, metrics, results;
    attr.memeText = attr.memeText.toString();
    ctx.globalAlpha = 1;
    ctx.textBaseline = 'middle';
    ctx.font = (attr.fontStyle + ' ' + attr.fontSize + 'px ' + attr.fontFace).trim();
    ctx.fillStyle = attr.fontColor;
    ctx.textAlign = attr.align;
    if (attr.shadowColor) {
      ctx.shadowColor = attr.shadowColor;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.shadowBlur = 5;
    }
    lineHeight = attr.fontSize * 1.3;
    lines = attr.memeText.toString().split('\n');
    metrics = ctx.measureText(attr.memeText);
    attr.w = metrics.width;
    attr.h = y + lineHeight * lines.length;

    /*
    switch(attr.align){
        case "left": x = 20; break;
        case "center": x = $scope.imgWidth / 2; break;
        case "right": x = $scope.imgWidth - 20; break;
    }
     */
    results = [];
    for (i = j = 0, len = lines.length; j < len; i = ++j) {
      line = lines[i];
      ctx.strokeText(line, x, y + (i * lineHeight));
      results.push(ctx.fillText(line, x, y + (i * lineHeight)));
    }
    return results;
  };
  Canvas.prototype.draw = function() {
    var $scope, canvas, ctx, height, img, width;
    $scope = this.scope;
    canvas = $scope.$canvasEl[0];
    img = new Image;
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = $scope.selectedImage;
    ctx = canvas.getContext('2d');
    width = $scope.imgWidth;
    height = $scope.imgHeight;
    return img.onload = (function(_this) {
      return function(e) {
        var j, len, ref, results, text;
        canvas.width = width;
        canvas.height = height;
        ctx.scale(1, 1);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, $scope.imgWidth, $scope.imgHeight);
        ref = $scope.memeArray;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          text = ref[j];
          results.push(_this.drawText(ctx, text, text.x, text.y));
        }
        return results;
      };
    })(this);
  };
  return Canvas;
});
