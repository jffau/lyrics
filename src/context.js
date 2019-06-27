import React, { Component } from 'react';
import axios from 'axios';
const Context = React.createContext();
const today = new Date().toLocaleDateString();
export class Provider extends Component {
  state = {
    track_list: [],
    heading: `Top 50 Tracks for ${today}`
  };

  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=50&country=us&f_has_lyrics=1&apikey=${
          process.env.REACT_APP_MM_KEY
        }`
      )
      .then(res => {
        this.setState({ track_list: res.data.message.body.track_list });
      })
      .catch();
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
