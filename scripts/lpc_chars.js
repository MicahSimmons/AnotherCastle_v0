
const Dir = {
  UP: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3
}

class SpriteBasic {
  constructor (scene, key, spritesheet_fn) {
    this.scene = scene;
    this.key = key;
    this.spritesheet_fn = spritesheet_fn;
    
    this.init = this.init.bind(this);
    this.preload = this.preload.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  init () {
    this.ani = '';
    this.last_ani = '';
  }

  preload (frameWidth, frameHeight, rowSize) {
    this.rowSize = rowSize;
    this.scene.load.spritesheet(this.key, 
                                this.spritesheet_fn, 
                                {
                                  frameWidth: frameWidth,
                                  frameHeight: frameHeight
                                });    
  }

  create (aniList) {
    aniList.forEach( (ani) => {
      let frm_spec = { start:ani.row*this.rowSize, end: (ani.row*this.rowSize)+ani.length };
      let frms = this.scene.anims.generateFrameNumbers(this.key, frm_spec );

      this.scene.anims.create({
        key: ani.name + "_" + this.key,
        frames: frms,
        frameRate: 10,
        repeat: (ani.name == 'lpc_dead') ? 0 : -1
      });      
    });

    this.grp = this.scene.physics.add.group();
    this.obj = this.grp.create(150, 400, this.key);
  }

  update () {
    if (this.ani != this.last_ani) {
      this.last_ani = this.ani;

      if (this.ani.length > 0) {
        this.obj.play(this.ani);   
      } else {
        this.obj.stop(0);
      }
    }
  }
}

class Bug extends SpriteBasic {
  constructor (scene) {
    super(scene, 'bug', 'characters/bunnysheet6.png');
    this.preload = this.preload.bind(this);
    this.create = this.create.bind(this);
  }

  preload () {
    super.preload(40,40, 8);
  }

  create () {
    let aniList = [
      { name: 'bug_down', row: 0, length: 7 },
      { name: 'bug_up', row: 1, length: 7 },
      { name: 'bug_right', row: 2, length: 7 },
      { name: 'bug_left', row: 3, length: 7 },
    ];
    super.create(aniList);

    this.ani = 'bug_right' + "_" + this.key;
    this.obj.setPosition(-100,500);
    this.obj.setScale(2.0);
  }
}

class LpcSprite extends SpriteBasic {
  constructor (scene, key, spritesheet_fn) {
    super(scene, key, spritesheet_fn);
    this.preload = this.preload.bind(this);
    this.create = this.create.bind(this);
  }
  
  preload() {
    super.preload(64,64, 13);
  }

  create () {
    let aniList = [
      /* Spell Casting Animations */
      { name: 'lpc_cast_up', row: 0, length: 6 },
      { name: 'lpc_cast_left', row: 1, length: 6 },
      { name: 'lpc_cast_down', row: 2, length: 6 },
      { name: 'lpc_cast_right', row: 3, length: 6 },

      /* Poke */
      { name: 'lpc_stab_up', row: 4, length: 7 },
      { name: 'lpc_stab_left', row: 5, length: 7 },
      { name: 'lpc_stab_down', row: 6, length: 7 },
      { name: 'lpc_stab_right', row: 7, length: 7 },

      /* Walk Cycles */
      { name: 'lpc_walk_up', row: 8, length: 8 },
      { name: 'lpc_walk_left', row: 9, length: 8 },
      { name: 'lpc_walk_down', row: 10, length: 8 },
      { name: 'lpc_walk_right', row: 11, length: 8 },

      /* Slash */
      { name: 'lpc_slash_up', row: 12, length: 5 },
      { name: 'lpc_slash_left', row: 13, length: 5 },
      { name: 'lpc_slash_down', row: 14, length: 5 },
      { name: 'lpc_slash_right', row: 15, length: 5 },

      /* Shoot */
      { name: 'lpc_shoot_up', row: 16, length: 12 },
      { name: 'lpc_shoot_left', row: 17, length: 12 },
      { name: 'lpc_shoot_down', row: 18, length: 12 },
      { name: 'lpc_shoot_right', row: 19, length: 12 },

      /* Dead */
      { name: 'lpc_dead', row: 20, length: 5 }

    ];

    super.create(aniList);

    this.obj.setScale(4.0);
    this.ani = 'lpc_shoot_down' + "_" + this.key;
  }


}

class Blacksmith extends LpcSprite {
  constructor (scene) {
    super(scene, 'blacksmith', 'characters/blacksmith.png');
  }
}

class Princess extends LpcSprite {
  constructor (scene) {
    super(scene, 'princess', 'characters/princess.png');
  }

  create () {
    super.create();
    this.ani = 'lpc_slash_right' + "_" + this.key;
    this.obj.setPosition(-600, 475);
    this.obj.setScale(2.0);
  }
  
  update () {
    super.update();
  }
}