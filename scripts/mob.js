

class Mob extends Bug {
  constructor (scene) {
    super(scene);
    this.init = this.init.bind(this);
    this.preload = this.preload.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  init () {
    super.init();
    this.speed = 20;
    this.countdown = 20;
    
    let dirs = [Dir.UP, Dir.DOWN, Dir.LEFT, Dir.RIGHT];
    this.dir = dirs[Math.floor(Math.random()*dirs.length)];
  }

  preload () {
    super.preload();
  }

  create () {
    super.create();
    this.obj.setDepth(1);
    this.obj.setScale(1.0);
  }

  update () {
    super.update();

    if (this.countdown-- < 0) {
      this.countdown = Math.floor(Math.random() * 240) + 60;
      
      let dirs = [Dir.UP, Dir.DOWN, Dir.LEFT, Dir.RIGHT];
      this.dir = dirs[Math.floor(Math.random()*dirs.length)];
      //console.log("New dir " + this.dir);
      
      switch (this.dir) {
        case Dir.UP:
          this.ani = 'bug_up_' + this.key;
          this.obj.setVelocity(0,-this.speed);
          break;
        case Dir.DOWN:
          this.ani = 'bug_down_' + this.key;
          this.obj.setVelocity(0,this.speed);
          break;
        case Dir.LEFT:
          this.ani = 'bug_left_' + this.key;
          this.obj.setVelocity(-this.speed, 0);
          break;
        case Dir.RIGHT:
          this.ani = 'bug_right_' + this.key;
          this.obj.setVelocity(this.speed, 0);
          break;
      }      
    }
  }
}