

class GameMenu_Background {
  constructor (scene) {
    this.scene = scene;
    this.preload = this.preload.bind(this);
    this.create = this.create.bind(this);
  }

  preload () {
    this.scene.load.image('bgimg', 'images/back2.png');
  }

  create () {
    this.bg = this.scene.add.image(400,300, 'bgimg');
    this.bg.setScale(0.55);
    this.bg.setDepth(-2);
  }
}

class GameRun_Background {
  constructor (scene) {
    this.scene = scene;
    this.preload = this.preload.bind(this);
    this.create = this.create.bind(this);
  }

  preload () {
    this.scene.load.image('bgimg2', 'images/starfield.jpg');
  }

  create () {
    this.bg = this.scene.add.image(400,300, 'bgimg2');
    this.bg.setScale(0.55);
  }
}

class GameMenu_Title {
  constructor (scene, title_str) {
    this.scene = scene;
    this.title_str = title_str;
    this.create = this.create.bind(this);
  }

  create () {
    this.text = this.scene.add.text(400, 150, this.title_str, {
       fontSize: '80px', 
       fill:'#F7D23B',
       boundsAlignH: 'center',
       boundsAlignV: 'middle'
    });

    this.text.setFontFamily('titles');
    this.text.setShadow(0,5, '#000', 5);
    this.text.setOrigin(0.5);
  }
}


/* 
 * INPUT:
 *  config: {
 *    btns: [ 
 *      { label: button_label, event_cb: click_hdlr }
 *    ],
 *    setXY: { x, y, stepX, stepY }
 *  }
 */
class GameMenu_ButtonGroup {
  constructor (scene, config) {
    this.scene = scene;
    this.config = config;
    this.preload = this.preload.bind(this);
    this.create = this.create.bind(this);

    this.btn_armed = -1;
  }

  preload () {
    this.scene.load.spritesheet('buttons', 'images/buttons.png',
                                {frameWidth:360, frameHeight: 178});
  }

  create () {
    this.buttons = this.scene.physics.add.group({
      key: 'buttons',
      repeat: this.config.btns.length - 1,
      setXY: this.config.setXY,
      allowGravity: false
    });

    this.buttons.children.iterate ( (btn, index) => {
      btn.setScale(0.5).refreshBody();
      btn.setAlpha(0.7);
      btn.cb = this.config.btns[index].event_cb;

      
      var lbl = this.scene.add.text(btn.x, btn.y, this.config.btns[index].label, {
        fontSize: '32px',
        fill: "#433",
        fontFamily: 'prompts'
      });
      lbl.setOrigin(0.5);


      btn.setInteractive();
      btn.on('pointerover', () => {
        btn.setFrame(1);
      });
      btn.on('pointerout', () => {
        btn.setFrame(0);
        this.btn_armed = -1;
      });
      btn.on('pointerdown', () => {
        btn.setFrame(2);
        this.btn_armed = index;
      });
      btn.on('pointerup', () => {
        btn.setFrame(0);
        if (this.btn_armed == index) {
          btn.cb();
        }        
      });

    });
  }
}

/*************
  config: {
    x: 0,
    y: 0,
    width: 400,
    key: 'musicbtn',
    img: 'images/musicbtn.png'
    min: 0,
    max: 100,
    value: 50
  }
 *************/
class SliderBar {
  constructor (scene, config, update_cb) {
    this.config = config;
    this.preload = this.preload.bind(this);
  }

  preload () {
    this.load.plugin('rexsliderplugin', 'resources/rexsliderplugin.min.js', true);
    this.load.spritesheet('btn_bgm', 'images/music.png',
                          {frameWidth:175, frameHeight: 175});  
  }

  create () {
    let bgm_ep = [
      {x: 400 - 200, y: 275 },
      {x: 400 + 200, y: 275 }
    ];
    this.add.graphics()
        .lineStyle(3, 0x55ff55, 1)
        .strokePoints(bgm_ep);
    this.bgm_btn = this.add.sprite(400, 275, 'btn_bgm');
    this.bgm_btn.setScale(0.5);
    this.bgm_slider = this.plugins.get('rexsliderplugin').add(this.bgm_btn, {
      endPoints: bgm_ep,
      value: bgm_ctx.bgm_volume
    });
    this.bgm_btn.on('pointerup', () => {
      bgm_ctx.bgm_volume = this.bgm_slider.value;
      bgm_ctx.bgm_obj.setVolume(bgm_ctx.bgm_volume);
    });    
  }

  update () {
    if (this.bgm_slider.value > 0) {
      this.bgm_btn.setFrame(1);
    } else {
      this.bgm_btn.setFrame(0);
    }    
  }
}