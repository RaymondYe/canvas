var Game = (function() {
  'use strict';

  function Game(args) {
    // enforces new
    if (!(this instanceof Game)) {
      return new Game(args);
    }

    for (var prop in args) {
      if (args.hasOwnProperty(prop)) {
        this[prop] = args[prop];
      }
    }
    if (!this.el) return;
    this.init();
    this.ctx = this.el.getContext("2d");
  }

  Game.prototype = {
    el: null,
    Width: 480,
    Height: 320,
    FPS: 60,
    ctx: null,
    name: 'Game',
    onInit: null,
    onStart: null,
    onPause: null,
    onResume: null,
    onStop: null,
  };

  Game.prototype.init = function() {
    var _this = this;
    this._run = function() {
      _this.run();
    };
    this.timer = {
      now: 0,
      last: 0,
      step: Math.round(1000 / this.FPS)
    };
    if (this.onInit) {
      this.onInit.apply(this, arguments);
    }
  };

  Game.prototype.start = function() {
    this.timer.now = Date.now();
    this.timer.last = Date.now();
    this.paused = false;
    this.running = true;
    if (this.onStart) {
      this.onStart();
    }
    this.run();
  };

  Game.prototype.update = function() {

  };

  Game.prototype.render = function() {};

  Game.prototype.run = function() {
    var now = this.timer.now = Date.now();
    var timeStep = now - this.timer.last;
    this.timer.last = now;
    this.loopId = setTimeout(this._run, this.timer.step);
    if (!this.paused && timeStep > 1) {
      this.update(timeStep, now);
      this.render(timeStep, now);
    }
    if (!this.running && this.loopId) {
      clearTimeout(this.loopId);
    }
  };

  return Game;
}());

var player = null;
var awe = null;

player = {
  color: "#f22",
  x: 220,
  y: 270,
  width: 32,
  height: 32,
  speed: 5,
  draw: function() {
    awe.ctx.fillStyle = this.color;
    awe.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};

awe = new Game({
  el: document.getElementById('canvas'),
  onInit: function() {}
});

awe.update = function() {

};

awe.clearCtx = function() {
  this.ctx.clearRect(0, 0, this.Width, this.Height);
  player.draw();
};



awe.render = function() {
  var _this = this;
  _this.clearCtx();
};

// Key Control
player.move = function(type) {
  if (type == 'left') this.x -= this.speed;
  if (type == 'right') this.x += this.speed;
  if (type == 'up') this.y -= this.speed;
  if (type == 'down') this.y += this.speed;
  if (this.x < 0) {
    this.x = 0;
  }
  if (this.x > awe.Width) {
    this.x = awe.Width - player.width;
  }
  if (this.y < 0) {
    this.y = 0;
  }
  if (this.y > awe.Height) {
    this.y = awe.Height - player.height;
  }
};
$(document).bind("keydown.left", function(e) {
  player.move('left');
});

$(document).bind("keydown.right", function(e) {
  player.move('right');
});

$(document).bind("keydown.up", function(e) {
  player.move('up');
});

$(document).bind("keydown.down", function(e) {
  player.move('down');
});

awe.start();