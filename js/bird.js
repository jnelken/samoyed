var bird = {

  x: 60,
  y: 0,
  frame: 0,
  velocity: 0,
  animation: [0, 1, 2, 3],
  rotation: 0,
  radius: 12 * size,
  gravity: 0.25 * size,
  _jump: 4.6 * size,

  jump: function() {
    this.velocity = -this._jump;
  },

  update: function() {
    var n = currentState === states.Splash ? 10 : 5;
    this.frame += frames % n === 0 ? 1 : 0;
    this.frame %= this.animation.length;

    if (currentState === states.Splash) {
      this.y = height - 280 + 5*Math.cos(frames/10);
      this.rotation = 0;
    } else {
      this.velocity += this.gravity;
      this.y += this.velocity;

      if (this.y >= height - s_fg.height-this.radius-2) {
        this.y = height - s_fg.height-this.radius-2;
        if (currentState === states.Game) {
          currentState = states.Score;
        }
        this.velocity = this._jump;

      }

      if (this.velocity >= this._jump) {
        this.frame = 1;
        this.rotation = Math.min(Math.PI/2, this.rotation + 0.3);
      } else {
        this.rotation = -0.3;
      }
    }
  },

  draw: function(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    // ctx.rotate(this.rotation);

    var n = this.animation[this.frame];
    s_bird[n].draw(ctx, -s_bird[n].width/2, -s_bird[n].height/2);

  //view hitbox
    // ctx.fillStyle = "#f00";
    // ctx.beginPath();
    // ctx.arc(0, 0, this.radius, 0, 2*Math.PI);
    // ctx.fill();

    ctx.restore();
  }
};
