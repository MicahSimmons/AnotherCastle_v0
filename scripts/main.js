
const GameStates = {
  MENU: 0,
  CREDITS: 1,
  OPTIONS: 2,
  GAME_RUN: 3,
}

const GameEvents = {
  MENU_BUTTON: 0,
  OPTIONS_BUTTON: 1,
  CREDITS_BUTTON: 2,
  START_BUTTON: 3
}

const init_model = {
  foo: "bar",
  state: GameStates.MENU,
  active_scene: "GameMenu"
}

class Model {
  constructor ( event_cb ) {
    Object.entries(init_model).forEach((e,i) => {
      let [k,v] = e;
      this[k] = v;
    });
  }

  setState( new_state ) {
    switch (new_state) {
      case GameStates.MENU:
        this.active_scene = "GameMenu";
        break;
      case GameStates.CREDITS:
        this.active_scene = "GameCredits";
        break;
      case GameStates.OPTIONS:
        this.active_scene = "GameOptions";
        break;
      case GameStates.GAME_RUN:
        this.active_scene = "GameRun";
        break;
    }

    this.state = new_state;
  }
}

class Game {
  constructor (dom_id) {
    this.fsm = this.fsm.bind(this);
    this.q = this.q.bind(this);
    
    this.config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      pixelArt: true,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      },
      scene: [
        GameMenu,
        GameCredits,
        GameOptions,
        GameRun
      ],
      parent: dom_id
    };

    this.model = new Model(this.q);
    
    this.game = new Phaser.Game(this.config);
    this.game.q = this.q;
    this.game.model = this.model;
  }

  fsm (event, data) {
    console.log("Got state:" + this.model.state + " event: " + event + " data:" + data);

    switch (this.model.state) {
      case GameStates.MENU:
        switch (event) {
          case GameEvents.START_BUTTON:
            this.model.setState(GameStates.GAME_RUN);
            break;
          case GameEvents.OPTIONS_BUTTON:
            this.model.setState(GameStates.OPTIONS);
            break;
          case GameEvents.CREDITS_BUTTON:
            this.model.setState(GameStates.CREDITS);
            break;
        }
        break;

      case GameStates.CREDITS:
        switch (event) {
          case GameEvents.MENU_BUTTON:
            this.model.setState(GameStates.MENU);
            break;
        }
        break;

      case GameStates.OPTIONS:
        switch (event) {
          case GameEvents.MENU_BUTTON:
            this.model.setState(GameStates.MENU);
            break;
        }
        break;
        
      default:
        console.log("Unknown state:" + this.model.state);
        break;
    }

    this.game.model = this.model;
  }

  q (event, data) {
    setTimeout(() => this.fsm(event, data), 1);
  }
}