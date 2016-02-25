var

canvas,
ctx,
width,
height,
fgpos = 0,

size = 2,
gap = 80 * size,

frames = 0,
score = 0,
best = 0,
okButton,

currentState,
states = {
  Splash: 0, Game: 1, Score: 2
};

function onPress(e) {
  switch (currentState) {
    case states.Splash:
      currentState = states.Game;
      bird.jump();
      break;

    case states.Game:
    bird.jump();
      break;

    case states.Score:
      var mx = e.offsetX, my = e.offsetY;
      if (mx === null || my === null) {
        mx = e.touches[0].clientX;
        my = e.touches[0].clientY;
      }
      // for mozilla:
      // var mx = e.layerX, my = e.layerY;

      if (okButton.x < mx && mx < okButton.x + okButton.width &&
          okButton.y < my && my < okButton.y + okButton.height
        ) {
          pipes.reset();
          currentState = states.Splash;
          score = 0;
        }
      break;

  }
}

function main() {
  canvas = document.createElement("canvas");
  width = window.innerWidth;
  height = window.innerHeight;

  var e = "touchstart";
  if (width >= 500) {
    e = "mousedown";
    width = 320;
    height = 480;
    canvas.style.border = "1px solid #000";
  }

  document.addEventListener(e, onPress);

  canvas.width = width;
  canvas.height = height;
  ctx = canvas.getContext("2d");

  currentState = states.Splash;
  document.body.appendChild(canvas);

  var img = new Image();
  img.src = "res/sheet.png";
  img.onload = function() {
    initSprites(this);
    ctx.fillStyle = s_bg.color;

    okButton = {
      x: (width - s_buttons.Ok.width)/2,
      y: height - 200,
      width: s_buttons.Ok.width,
      height: s_buttons.Ok.height
    };
    run();
  };
}

function run() {
  var loop = function() {
    update();
    render();
    window.requestAnimationFrame(loop, canvas);
  };
  window.requestAnimationFrame(loop, canvas);
}

function update() {
  frames++;

  if (currentState !== states.Score) {
    fgpos = (fgpos - 2) % 14;
  } else {
    best = Math.max(best, score);
  }
  if (currentState === states.Game) {
    pipes.update();
  }

  bird.update();
}

function render() {
  ctx.fillRect(0, 0, width, height);
  s_bg.draw(ctx, 0, height - s_bg.height);
  s_bg.draw(ctx, s_bg.width, height - s_bg.height);

  bird.draw(ctx);
  pipes.draw(ctx);

  s_fg.draw(ctx, fgpos, height - s_fg.height);
  s_fg.draw(ctx, fgpos+s_fg.width, height - s_fg.height);

  if (currentState === states.Splash) {
    s_samoyedG.draw(ctx, midX(s_samoyedG), height - 320);
    s_splash.draw(ctx, midX(s_splash), height - 250);
    s_text.GetReady.draw(ctx, midX(s_text.GetReady), height-380);
  }
  if (currentState === states.Score) {
    s_text.GameOver.draw(ctx, midX(s_text.GameOver), height-400);
    s_score.draw(ctx, midX(s_score), height-340);
    s_buttons.Ok.draw(ctx, okButton.x, okButton.y);

    s_numberS.draw(ctx, midX()-47, height-304, score, null, 10);
    s_numberS.draw(ctx, midX()-47, height-262, best, null, 10);
  } else {
    s_numberB.draw(ctx, null, 20, score, midX());
  }
}

function midX(img) {
  var img = typeof img !== 'undefined' ?  img : { width: 0 };
  return width/2 - img.width/2;
}
