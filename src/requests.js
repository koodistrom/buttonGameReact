import axios from 'axios';
 // TODO: error handling
 /**
  * Is called before highscore view. Fetches top 10 highscore information from back end
  *
  * @returns array of objects with point, name, and id information 
  */
 export async function  fetchHs() {
    const result = await   axios({
      method: 'get',
      url: 'https://jm-button-game-server.herokuapp.com/hs',
      withCredentials: true,
      })
      .then(response => {
        return response.json();
      })
      .then(hsInfoJson => {
        return hsInfoJson;
      });

    return result;
  }


/**
 * Sends username to back end. Called when start button is pressed.
 * @param {String} name is username that is send to backend and used in high score list
 * @returns object consisting of player info for new player:
 *  name, points(20), win(false), and the clicks to next winning state
 */
export async function fetchSetName(name) {

    const result = await fetch("https://jm-button-game-server.herokuapp.com/name", {
      method: "post",
      withCredentials: true,
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      }
      , body: JSON.stringify({ name })
    })
      .then(response => {
        return response.json();
      })
      .then(playerInfoJson => {

        return playerInfoJson;
      });
    return result;
  }



/**
 * Fetches current situation of the game session. If session isn't
 * found returns info with null name and 0 points.
 *
 * @export
 * @returns  object consisting of player info:
 *  name, points, win(false), and the clicks to next winning state
 */
export async function fetchSessionInfo() {

    let result = await fetch("https://jm-button-game-server.herokuapp.com/current-session", {
      method: "get",
      withCredentials: true,
      credentials: "include"
    })
      .then(response => {
        return response.json();
      })
      .then(playerInfoJson => {
        return playerInfoJson;
      });
    return result;
  }

/**
 * Tells the back end to append the "click count" by one and then returns the updated
 * situation
 * @returns  object consisting of player info:
 *  name, points, win, and the clicks to next winning state
 */
export async function fetchPlay() {
    let result = await fetch("https://jm-button-game-server.herokuapp.com/play", {
      method: "post",
      withCredentials: true,
      credentials: "include"
    })
      .then(response => {
        return response.json();
      })
      .then(playerInfoJson => {
        return playerInfoJson;
      });

    return result;
  }

