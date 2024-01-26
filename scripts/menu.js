

class GameMenu extends Phaser.Scene {
  constructor () {
    let key = "GameMenu";
    super(key);
    this.key = key;
  }

  init () {
    this.princess = new Princess(this);
    this.bug = new Bug(this);
    
    this.obj_list = [
      new GameMenu_Background(this),
      new GameMenu_Title(this, "Within Another Castle"),
      new GameMenu_ButtonGroup(this, {
        btns: [
          { label: "Start", event_cb: () =>   { this.game.q(GameEvents.START_BUTTON);  } },
          { label: "Options", event_cb: () => { this.game.q(GameEvents.OPTIONS_BUTTON); } },
          { label: "Credits", event_cb: () => { this.game.q(GameEvents.CREDITS_BUTTON); } },
        ],
        setXY: { x: 400, y: 300, stepY: 100 }
      }),
      this.princess,
      this.bug
    ];
  }

  preload () {
    this.obj_list.forEach((obj) => {
      if (typeof obj.preload === 'function') {
        obj.preload();
      }
    });
  }

  create () {
    this.obj_list.forEach((obj) => {
      if (typeof obj.create === 'function') {
        obj.create();
      }
    });

    this.princess.obj.setDepth(-1);
    this.bug.obj.setDepth(-1);
    
    var tween = this.tweens.add({
      targets: [this.princess.obj, this.bug.obj],
      x: 1200,
      ease: 'Power1',
      duration: 12000,
      loop: -1
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