import React from "react";
import Banner from "./Banner";
import * as requests from "./requests";
import "./App.css";
import * as utils from "./utils"

// TODO: error handling

/**
 * Main app. 
 *
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {

  /**
   *Creates an instance of App. Sets initial state.
   * @param {*} props
   * @memberof App
   */
  constructor(props) {
    super(props);

    this.state = { gameState: () => null, points: 0, name: null, header: "fetching data", highScores: [] };

  }

  /**
   * Is called when App component is mounted. Checks if there is game id stored already and
   * starts new game or returns to old accordingly.  
   *
   * @memberof App
   */
  async componentDidMount() {

    if(localStorage.getItem('id')===null){
      localStorage.setItem('id',utils.randomId() );
      console.log(localStorage.getItem('id'))
    }

    let gameInfo = await requests.fetchSessionInfo();
    this.setState(gameInfo);
    this.state.name !== null && this.state.points !== 0 ? this.changeToGameView() : this.changeToStartView()
  }
 
  /**
   *Sets user input from form to App's state.
   *
   * @param {*} event
   * @memberof App
   */
  handleFormChange(event) {
    this.setState({ formValue: event.target.value });
  }

  /**
   * Called when player pushes play button. Calls the fetchPlay() request
   * to raise click count and obtain data from back end and changes state accordingly.
   *
   * @memberof App
   */
  async play(){
    let playerInfoJson = await requests.fetchPlay();
    if(playerInfoJson.win === true){
      this.setState({winAmmount: playerInfoJson.points - this.state.points+1})
    }
    this.setState(playerInfoJson);
    if (this.state.points === 0) {
      this.changeToStartView();
    }
  }

  /**
   * Changes header to new game and game state to start view.
   *
   * @memberof App
   */
  changeToStartView() {

    this.setState({ header: "NEW GAME", gameState: () => this.startView() })
  }
/**
 * Start view asks user for name by form and calls startNewGame()
 * when user presses start/restart button.
 * 
 *
 * @returns  {React.Component}
 * @memberof App
 */
startView(){
    
      return (
        <div id="soft-down" className="Game">
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
            <input
                type="text"
                value={this.state.formValue}
                onChange={(event)=>this.handleFormChange(event)}
              />
            </label>

          </form>
          <button id="soft-up" className="play-button" onClick={() => this.startNewGame()}>
            START
          </button>
        </div>
      );
  }

  /**
   * Calls fetchSetName() to send user's name to back end.
   * If it is succesfull changes to gameview.
   *
   * @memberof App
   */
  async startNewGame(){
    
    // TODO: input validation for player name
    let playerInfoJson = await requests.fetchSetName( this.state.formValue);

    await this.setState(playerInfoJson);
    if (this.state.name == null) {
      this.changeToStartView();
    } else {
      this.changeToGameView();
    }
  }

  /**
   *  Changes header to user's name and game state to game view.
   *
   * @memberof App
   */
  changeToGameView() {
    this.setState({ header: this.state.name, gameState: () => this.gameView()})
    }

  /**
   * Displays user's points, play button, and clicks to next win or amount of points won.
   *  
   *
   * @returns  {React.Component}
   * @memberof App
   */
  gameView(){
    return (
      <div id="soft-down" className="Game">
        <div className="points">{this.state.points}</div>
        <button
          id="soft-up"
          onClick={() => this.play()}
          className="play-button"
        >
          {" "}
          PLAY{" "}
        </button>
        <div className="To-next-win">
          {this.state.win ? "You won "+ this.state.winAmmount +" points!" : this.state.distanceToNextPrice + " clicks to next win"}
        </div>
      </div>
    );
  }

  /**
   * Called when user pushes high scores button.
   * Calls fetchHs() to aquire high score data and sets state to hsView() to display it.
   *
   * @memberof App
   */

  async changeToHsView() {
    let hsInfoJson = await requests.fetchHs();
    this.setState({ highScores: hsInfoJson })
    this.setState({
      header: "HIGH SCORES", gameState: () => this.hsView()
    });
  }

  /**
   * Displays state.highScores array as ordered list.
   *
   * @returns {React.Component}
   * @memberof App
   */
  hsView() {
    return (
      <div id="soft-down" className="Game">
        <ol className="HS-table">
          {this.state.highScores.map((score) =>
            <li className="HS-item" key={score.id}>
              {score.name}
              <div className="Score">{score.points}</div>

            </li>
          )}
        </ol>
      </div>
    );
  }
/**
 *
 * @returns {React.Component}
 * @memberof App
 */
render() {
    return (
      <div className="App">
        <h1 id="soft-up" className="header">
          {this.state.header}
        </h1>

        <button
          id="soft-up"
          className="Game-button"
          onClick={this.state.points === 0 ? () => this.changeToStartView() : () => this.changeToGameView()}
        >
          GAME
        </button>
        <button
          id="soft-up"
          className="HS-button"
          onClick={() => this.changeToHsView()}
        >
          HIGH SCORE
        </button>
        {this.state.gameState()}
        <Banner />
      </div>
    );
  }
}

export default App;
