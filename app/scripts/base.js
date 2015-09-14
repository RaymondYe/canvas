var Can = (function() {
  'use strict';

  function Can(args) {
    // enforces new
    if (!(this instanceof Can)) {
      return new Can(args);
    }
    for (var prop in args) {
      if (args.hasOwnProperty(prop)) {
        this[prop] = args[prop];
      }
    }
    this.init();
  }

  Can.prototype = {
    el: null,
    ctx: null,
    status: false,
    width: 0,
    height: 0
  }

  // 初始化 Canvas
  Can.prototype.init = function() {
    var _this = this;
    if (_this.el.getContext) {
      _this.ctx = _this.el.getContext('2d');
      _this.width = _this.el.width;
      _this.height = _this.el.height;
      _this.status = true;
    }
  };

  /**
   *绘制路径
   *beginPath() 表示开始绘制路径
   *moveTo(x, y) 设置线段的起点
   *lineTo(x, y) 设置线段的终点
   *ctx.lineWidth  设置线宽
   *ctx.strokeStyle  设置线的颜色
   *stroke() 用来给透明的线段着色
   *closePath() 自动绘制一条当前点到起点的直线，形成一个封闭图形，省却使用一次lineto方法
   *moveto和lineto方法可以多次使用
   */
  Can.prototype.drawLine = function() {
    this.ctx.beginPath();
    this.ctx.moveTo(20, 20);
    this.ctx.lineTo(200, 20);
    this.ctx.lineWidth = 10;
    this.ctx.strokeStyle = "#CC0000";
    this.ctx.stroke();
  };

  /**
   * 绘制矩形
   * fillRect(x, y, width, height) 绘制矩形
   * x 矩形左上角顶点的x坐标
   * y 矩形左上角顶点的y坐标
   * width 矩形的宽
   * height 矩形的高
   * fillStyle 属性用来设置矩形的填充色
   * strokeRect() 与fillRect类似，用来绘制空心矩形
   * clearRect() 用来清除某个矩形区域的内容
   */
  Can.prototype.drawRect = function() {
    this.ctx.fillStyle = 'yellow';
    this.ctx.fillRect(50, 50, 200, 100);
    this.ctx.strokeRect(10, 10, 200, 100);
    this.ctx.clearRect(100, 50, 50, 50);
  };

  /**
   * 绘制文本
   * fillText(string, x, y) 绘制文本
   * string 文本内容
   * x 起点的x坐标
   * y 起点的y坐标
   * 使用之前,需用font设置字体、大小、样式（写法类似与CSS的font属性）
   * 与此类似的还有strokeText方法,用来添加空心字
   */
  Can.prototype.drawText = function() {
    this.ctx.font = "Bold 20px Arial";
    this.ctx.textAlign = "left";
    this.ctx.fillStyle = "#008600";
    this.ctx.fillText("Hello!", 10, 50);
    this.ctx.strokeText("Hello!", 10, 100);
  };

  /**
   * 绘制圆形和扇形
   * arc(x, y, radius, startAngle, endAngle, anticlockwise) 用来绘制扇形
   * x,y 圆心坐标
   * radius 半径
   * startAngle 扇形的起始角度
   * endAngle 终止角度 以弧度表示
   * anticlockwise 做图时应该逆时针画（true）还是顺时针画（false）
   */
  Can.prototype.drawCricle = function() {
    //绘制实心的圆形
    this.ctx.beginPath();
    this.ctx.arc(60, 60, 50, 0, Math.PI * 2, true);
    this.ctx.fillStyle = "#666";
    this.ctx.fill();
    //绘制空心圆形
    this.ctx.beginPath();
    this.ctx.arc(60, 60, 50, 0, Math.PI * 2, true);
    this.ctx.lineWidth = 1.0;
    this.ctx.strokeStyle = "#f22";
    this.ctx.stroke();
  };

  /**
   * 设置渐变色
   * createLinearGradient方法用来设置渐变色。
   */
  Can.prototype.drawGradient = function() {
    var myGradient = this.ctx.createLinearGradient(0, 0, 0, 160);
    myGradient.addColorStop(0, "#BABABA");
    myGradient.addColorStop(1, "#636363");
    //createLinearGradient方法的参数是(x1, y1, x2, y2)，其中x1和y1是起点坐标，x2和y2是终点坐标。通过不同的坐标值，可以生成从上至下、从左到右的渐变等等
    this.ctx.fillStyle = myGradient;
    this.ctx.fillRect(10, 10, 200, 100);
  };

  // Setting Shadow
  Can.prototype.drawShadow = function() {
    this.ctx.shadowOffsetX = 10; // 设置水平位移
    this.ctx.shadowOffsetY = 10; // 设置垂直位移
    this.ctx.shadowBlur = 5; // 设置模糊度
    this.ctx.shadowColor = "rgba(0,0,0,0.5)"; // 设置阴影颜色
    this.ctx.fillStyle = "#CC0000";
    this.ctx.fillRect(10, 10, 200, 100);
  };

  //灰度图（grayscale）就是取红、绿、蓝三个像素值的算术平均值，这实际上将图像转成了黑白形式。假定d[i]是像素数组中一个象素的红色值，则d[i+1]为绿色值，d[i+2]为蓝色值，d[i+3]就
  //是alpha通道值。转成灰度的算法，就是将红、绿、蓝三个值相加后除以3，再将结果写回数组。
  Can.prototype.grayscale = function(pixels) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
      var r = d[i];
      var g = d[i + 1];
      var b = d[i + 2];
      d[i] = d[i + 1] = d[i + 2] = (r + g + b) / 3;
    }
    return pixels;
  };

  //复古效果（sepia）则是将红、绿、蓝三个像素，分别取这三个值的某种加权平均值，使得图像有一种古旧的效果。
  Can.prototype.sepia = function(pixels) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
      var r = d[i];
      var g = d[i + 1];
      var b = d[i + 2];
      d[i] = (r * 0.393) + (g * 0.769) + (b * 0.189); // red
      d[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168); // green
      d[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131); // blue
    }
    return pixels;
  };

  //红色蒙版指的是，让图像呈现一种偏红的效果。算法是将红色通道设为红、绿、蓝三个值的平均值，而将绿色通道和蓝色通道都设为0。
  Can.prototype.red = function(pixels) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
      var r = d[i];
      var g = d[i + 1];
      var b = d[i + 2];
      d[i] = (r + g + b) / 3; // 红色通道取平均值
      d[i + 1] = d[i + 2] = 0; // 绿色通道和蓝色通道都设为0
    }
    return pixels;
  };

  //亮度效果（brightness）是指让图像变得更亮或更暗。算法将红色通道、绿色通道、蓝色通道，同时加上一个正值或负值。
  Can.prototype.brightness = function(pixels, delta) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
      d[i] += delta; // red
      d[i + 1] += delta; // green
      d[i + 2] += delta; // blue
    }
    return pixels;
  };

  //反转效果（invert）是指图片呈现一种色彩颠倒的效果。算法为红、绿、蓝通道都取各自的相反值（255-原值）。
  Can.prototype.invert = function(pixels) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
      d[i] = 255 - d[i];
      d[i + 1] = 255 - d[i + 1];
      d[i + 2] = 255 - d[i + 2];
    }
    return pixels;
  };

  //save方法用于保存上下文环境，restore方法用于恢复到上一次保存的上下文环境。
  Can.prototype.testSave = function() {
    //先用save方法，保存了当前设置，然后绘制了一个有阴影的矩形。接着，使用restore方法，恢复了保存前的设置，绘制//了一个没有阴影的矩形
    this.ctx.save();
    this.ctx.shadowOffsetX = 10;
    this.ctx.shadowOffsetY = 10;
    this.ctx.shadowBlur = 5;
    this.ctx.shadowColor = "rgba(0,0,0,0.5)";
    this.ctx.fillStyle = "#CC0000";
    this.ctx.fillRect(10, 10, 150, 100);
    this.ctx.restore();
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(180, 10, 150, 100);
  };

  //canvas允许将图像文件插入画布，做法是读取图片后，使用drawImage方法在画布内进行重绘。
  //由于图像的载入需要时间，drawImage方法只能在图像完全载入后才能调用
  //drawImage()方法接受三个参数，第一个参数是图像文件的DOM元素（即img标签），第二个和第三个参数是图像左上角在//Canvas元素中的坐标，上例中的（0, 0）就表示将图像左上角放置在Canvas元素的左上角。
  Can.prototype.drawImages = function(src, cb) {
    var _this = this;
    var img = new Image();

    img.onload = function() {

      if (img.width != _this.el.width) {
        _this.el.width = img.width;
        _this.width = img.width;
      }

      if (img.height != _this.el.height) {
        _this.el.height = img.height;
        _this.height = img.height;
      }

      _this.ctx.clearRect(0, 0, _this.width, _this.height);
      _this.ctx.drawImage(img, 0, 0);

      if (cb) {
        cb(_this);
      }

    };

    img.src = src;
  };

  //getImageData方法可以用来读取Canvas的内容，返回一个对象，包含了每个像素的信息。
  //imageData对象有一个data属性，它的值是一个一维数组。该数组的值，依次是每个像素的红、绿、蓝、alpha通道值，因//此该数组的长度等于 图像的像素宽度 x 图像的像素高度 x 4，每个值的范围是0–255。这个数组不仅可读，而且可写，
  //因此通过操作这个数组的值，就可以达到操作图像的目的。修改这个数组以后，使用putImageData方法将数组内容重新绘//制在Canvas上。
  //通过getImageData方法和putImageData方法，可以处理每个像素，进而操作图像内容。
  //假定filter是一个处理像素的函数，那么整个对Canvas的处理流程，可以用下面的代码表示。
  Can.prototype.fixImage = function(method) {
    var _this = this;
    if (_this.width > 0 && _this.height > 0) {
      var imageData = _this.ctx.getImageData(0, 0, _this.width, _this.height);
      if (_this[method]) {
        _this[method](imageData);
      }
      _this.ctx.putImageData(imageData, 0, 0);
    }
  };

  //toDataURL 转化成一般的图像文件形式。
  Can.prototype.convertCanvasToImage = function() {
    var _this = this;
    var image = new Image();
    image.src = _this.el.toDataURL("image/png");
    return image;
  };

  // 椭圆
  Can.prototype.EllipseTwo = function(x, y, a, b) {
    var _this = this;
    _this.ctx.save();
    _this.ctx.globalCompositeOperation = 'destination-in';
    var r = (a > b) ? a : b;
    var ratioX = a / r;
    var ratioY = b / r;
    _this.ctx.scale(ratioX, ratioY);
    _this.ctx.beginPath();
    _this.ctx.arc(x / ratioX, y / ratioY, r, 0, 2 * Math.PI, false);
    _this.ctx.closePath();
    _this.ctx.restore();
    _this.ctx.fill();
  };

  // canvasRadius
  Can.prototype.canvasRadius = function(x, y, w, h, tl, tr, br, bl) {
    var _this = this;
    _this.ctx.save();
    _this.ctx.globalCompositeOperation = 'destination-in';

    var r = x + w,
      b = y + h;
    _this.ctx.beginPath();
    _this.ctx.moveTo(x + tl, y);
    _this.ctx.lineTo(r - (tr), y);
    _this.ctx.quadraticCurveTo(r, y, r, y + tr);
    _this.ctx.lineTo(r, b - br);
    _this.ctx.quadraticCurveTo(r, b, r - br, b);
    _this.ctx.lineTo(x + bl, b);
    _this.ctx.quadraticCurveTo(x, b, x, b - bl);
    _this.ctx.lineTo(x, y + tl);
    _this.ctx.quadraticCurveTo(x, y, x + tl, y);
    _this.ctx.closePath();
    _this.ctx.restore();
    _this.ctx.fill();

  };

  //canvas animate
  Can.prototype.animate = function() {
    var _this = this;
    var posX = 20,
      posY = 100;
    setInterval(function() {
      _this.ctx.fillStyle = "black";
      _this.ctx.fillRect(0, 0, canvas.width, canvas.height);
      posX += 1;
      posY += 0.25;
      _this.ctx.beginPath();
      _this.ctx.fillStyle = "white";
      _this.ctx.arc(posX, posY, 10, 0, Math.PI * 2, true);
      _this.ctx.closePath();
      _this.ctx.fill();
    }, 30);
    var vx = 10,
      vy = -10,
      gravity = 1;
    setInterval(function() {
      posX += vx;
      posY += vy;
      vy += gravity;
    });
    var vx = 10,
      vy = -10,
      gravity = 1;
    setInterval(function() {
      posX += vx;
      posY += vy;
      if (posY > _this.el.height * 0.75) {
        vy *= -0.6;
        vx *= 0.75;
        posY = _this.el.height * 0.75;
      }
      vy += gravity;
    });
  };

  Can.prototype.drawBlurImage = function(imageSrc) {

    var _this = this;
    var img = new Image();

    img.onload = function() {

      if (img.width != _this.el.width) {
        _this.el.width = img.width;
        _this.width = img.width;
      }

      if (img.height != _this.el.height) {
        _this.el.height = img.height;
        _this.height = img.height;
      }

      _this.ctx.clearRect(0, 0, _this.width, _this.height);

      _this.ctx.globalCompositeOperation = 'source-over';
      _this.ctx.drawImage(img, 0, 0, _this.width, _this.height);

      _this.ctx.globalCompositeOperation = 'destination-out';
      StackBlur.stackBlurCanvasRGBA(canvas, 0, 0, _this.width, _this.height, 25);
      _this.ctx.globalCompositeOperation = 'destination-in';

      _this.canvasRadius(0, 0, _this.width, _this.width, 10, 10, 10, 10)

      // Create Cricle
      // _this.ctx.beginPath();
      // _this.ctx.arc(_this.width / 2, _this.height / 2, _this.width / 2, 0, Math.PI * 2, true);
      // _this.ctx.fillStyle = "#ccc";
      // _this.ctx.fill();

    };

    img.src = imageSrc;

  };

  return Can;
}());

var blurCanvas = new Can({
  el: document.getElementById('canvas')
});

blurCanvas.drawImages("./images/linktocat.jpg");

