


class GameRun extends Phaser.Scene {
  constructor () {
    let key = "GameRun";
    super(key);
    this.key = key;

    this.init = this.init.bind(this);
    this.create = this.create.bind(this);
    this.preload = this.preload.bind(this);
    this.update = this.update.bind(this);
  }

  init () {
    this.avatar = new Avatar(this);
    this.mobs = [];
    
    this.obj_list = [
      //new GameRun_Background(this),
      this.avatar
    ];

    for (let i=0; i<12; i++) {
      var mob = new Mob(this);
      this.obj_list.push(mob);
      this.mobs.push(mob);
    }

    
    this.obj_list.forEach((obj) => {
      if (typeof obj.init === 'function') {
        obj.init();
      }
    });    
  }


  preload () {
    this.obj_list.forEach((obj) => {
      if (typeof obj.preload === 'function') {
        obj.preload();
      }
    });

    this.load.image('tiles', 'terrain/mountain_landscape.png');
    this.load.tilemapTiledJSON('map', 'terrain/Loggerman.json');
  }

  create () {
    this.obj_list.forEach((obj) => {
      if (typeof obj.create === 'function') {
        obj.create();
      }
    });

    this.map = this.make.tilemap({key: 'map'});
    this.tileset = this.map.addTilesetImage('mountain_landscape_32', 'tiles');

    this.map.layers.forEach( (layer) => {
      console.log(layer.name);      
    })
    
    this.path = this.map.createStaticLayer('path', this.tileset, 0, 0);
    this.ground = this.map.createStaticLayer('Ground', this.tileset, 0, 0);
    this.walls = this.map.createLayer('Walls', this.tileset, 0,0 );
    this.scatter = this.map.createStaticLayer('Scatter', this.tileset, 0,0);

    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.walls.setCollisionBetween(1, 999);
    this.physics.add.collider(this.avatar.obj, this.walls);

    this.mobgrp = this.physics.add.group();
    this.mobs.forEach((mob) => this.mobgrp.add(mob.obj));
    this.physics.add.collider(this.mobgrp, this.walls);
    
    this.mobgrp.children.iterate( (mob) => {
      let ok = false;
      while (!ok) {
        let mob_x = Math.floor(Math.random()*this.map.widthInPixels);
        let mob_y = Math.floor(Math.random()*this.map.heightInPixels);
        let tile = this.walls.getTileAtWorldXY(mob_x, mob_y);
        //console.log("coords:" + mob_x + "," + mob_y + " tile:" + tile);
        if (null == tile) {
          ok = true;
          mob.setPosition(mob_x, mob_y);
        }
      }
    });
  }

  update () {
    this.obj_list.forEach((obj) => {
      if (typeof obj.update === 'function') {
        obj.update();
      }
    });

    if (this.game.model.active_scene != this.key) {
      this.scene.start(this.game.model.active_scene);
    }    
  }
}