import React from 'react';
import './App.css';

// TODO: error handling

/**
 *Glorious banner ad promoting skilled developers.
 *
 * @class Banner
 * @extends {React.Component}
 */
class Banner extends React.Component {

  /**
   * Creates an instance of Banner. Sets initial state.
   * Creates banner image and text arrays of which the ad content is randomly selected.
   * @param {*} props
   * @memberof Banner
   */ 

  constructor(props) {
    super(props);
    this.imgs = [<iframe src="https://gifer.com/embed/2AC" width="480" height="268.800" frameBorder="0" title="coder" allowFullScreen></iframe>,
       <iframe src="https://gifer.com/embed/1FA" width="480" height="270.000" frameBorder="0"  title="hacker" allowFullScreen></iframe>];

    this.texts = ["Skilled developers in your area!", "Click here for coders!"];
    this.state = {img: this.imgs[0], text: this.texts[0]}
  }

  /**
   *Sets interval of ad content change.
   *
   * @memberof Banner
   */
  componentDidMount() {
    setInterval(()=>this.changeBanner(), 7000);
  }

  /**
   * Selects random image and text from arrays for the ad content and sets them to state.
   *
   * @memberof Banner
   */
  changeBanner(){
    let rndImg = this.imgs[Math.floor(Math.random() * 2)];
    let rndText  =this.texts[Math.floor(Math.random() * 2)];
    this.setState({img: rndImg, text: rndText});
  }

/**
 * @returns {React.Component}
 * @memberof Banner
 */
render() {
    return <div id="soft-down" className="Banner">
      {this.state.img}
      <a href="http://home.tamk.fi/~c8jamant/">{this.state.text}</a>
      
      </div>;
  }
}

export default Banner;
