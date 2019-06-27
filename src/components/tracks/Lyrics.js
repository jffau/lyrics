import React, { Component } from 'react';
import axios from 'axios';
export default class Lyrics extends Component {
  // component level state, not needed in app level state of context
  state = {
    track: {},
    lyrics: ''
  };

  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
          this.props.match.params.id
        }&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then(res =>
        this.setState({ lyrics: res.data.message.body.lyrics.lyrics_body })
      )
      .catch(res => console.log(res));
  }
  render() {
    return (
      <div>
        <h1>Lyrics</h1>
        <p>{this.state.lyrics}</p>
      </div>
    );
  }
}
