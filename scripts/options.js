

class GameOptions extends Phaser.Scene {
  constructor () {
    let key = "GameOptions";
    super(key);
    this.key = key;
  }

  init () {
    this.obj_list = [
      new GameMenu_Background(this),
      new GameMenu_Title(this, "Options"),
      new GameMenu_ButtonGroup(this, {
        btns: [
          { label: "Main Menu", event_cb: () => { 
              console.log("button clicked.");
              this.game.q(GameEvents.MENU_BUTTON); 
            } 
          },
        ],
        setXY: { x: 400, y: 500, stepY: 100 }
      })
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