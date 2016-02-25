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
  // canvas
  ctx.fillRect(0, 0, width, height);
  // background
  s_bg.draw(ctx, 0, height - s_bg.height);
  s_bg.draw(ctx, s_bg.width, height - s_bg.height);
  // foreground
  s_fg.draw(ctx, fgpos, height - s_fg.height);
  s_fg.draw(ctx, fgpos + s_fg.width, height - s_fg.height);
  // items
  bird.draw(ctx);
  pipes.draw(ctx);
  //screen states
  if (currentState === states.Splash) {
    s_samoyedG.draw(ctx, midX(s_samoyedG), height - 320);
    s_splash.draw(ctx, midX(s_splash), height - 250);
    s_text.GetReady.draw(ctx, midX(s_text.GetReady), height - 380);
  }
  if (currentState === states.Score) {
    s_text.GameOver.draw(ctx, midX(s_text.GameOver), height - 400);
    s_score.draw(ctx, midX(s_score), height - 340);
    s_buttons.Ok.draw(ctx, okButton.x, okButton.y);

    s_numberS.draw(ctx, midX() - 47, height - 304, score, null, 10);
    s_numberS.draw(ctx, midX() - 47, height - 262, best, null, 10);
  } else {
    s_numberB.draw(ctx, null, 20, score, midX());
  }
}

function midX(img) {
  var img = typeof img !== 'undefined' ? img : {
    width: 0
  };
  return width / 2 - img.width / 2;
}
