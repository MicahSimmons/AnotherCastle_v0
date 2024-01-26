

class Avatar extends Princess {
  constructor (scene) {
    super(scene);
    this.init = this.init.bind(this);
    this.preload = this.preload.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  init () {
    super.init();
    this.speed = 200;
  }

  preload () {
    super.preload();
  }

  create () {
    super.create();
    this.obj.setDepth(1);
    this.obj.setPosition(200,200);
    this.obj.setScale(1.0);
    this.ani = 'lpc_walk_down_' + this.key;

    this.keys = this.scene.input.keyboard.addKeys({
      up: 'w',
      down: 's',
      left: 'a',
      right: 'd',
      attack: 'SPACE'
    });
    this.scene.cameras.main.startFollow(this.obj);
  }

  update () {
    super.update();

    let vel = {x: 0, y:0};
    if (this.keys.up.isDown) {
      vel.y = -this.speed;
      this.dir = Dir.UP;
      this.ani = 'lpc_walk_up_' + this.key;
    }

    if (this.keys.down.isDown) {
      vel.y = this.speed;
      this.dir = Dir.DOWN;
      this.ani = 'lpc_walk_down_' + this.key;

    }

    if (this.keys.left.isDown) {
      vel.x = -this.speed;
      this.dir = Dir.LEFT;
      this.ani = 'lpc_walk_left_' + this.key;

    }

    if (this.keys.right.isDown) {
      vel.x = this.speed;
      this.dir = Dir.RIGHT;
      this.ani = 'lpc_walk_right_' + this.key;
    }

    this.obj.setVelocity(vel.x, vel.y);
    if ((vel.x == 0) && (vel.y == 0)) {
      this.ani = '';
    }

    if (this.keys.attack.isDown) {
      switch (this.dir) {
        case Dir.UP:
          this.ani = 'lpc_slash_up_' + this.key;
          break;
        case Dir.DOWN:
          this.ani = 'lpc_slash_down_' + this.key;
          break;
        case Dir.LEFT:
          this.ani = 'lpc_slash_left_' + this.key;
          break;
        case Dir.RIGHT:
          this.ani = 'lpc_slash_right_' + this.key;
          break;

      }
    }
  }
}