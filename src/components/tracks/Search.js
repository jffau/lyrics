import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';
export default class Search extends Component {
  state = {
    trackTitle: ''
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  findTrack = (dispatch, e) => {
    e.preventDefault();
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${
          this.state.trackTitle
        }&page_size=10&page=1&s_track_rating=desc&apikey=${
          process.env.REACT_APP_MM_KEY
        }`
      )
      .then(res => {
        dispatch({
          type: 'SEARCH_TRACKS',
          payload: res.data.message.body.track_list
        });
      })
      .catch(err => {
        console.error(err);
      });
  };
  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-5 text-center text-capitalize mb-4">
                <i className="fas fa-music" /> Search for your favorite song
              </h1>
              <form onSubmit={this.findTrack.bind(this, dispatch)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Song Title"
                    name="trackTitle"
                    onChange={this.onChange}
                    value={this.state.trackTitle}
                  />
                </div>
                <button
                  className="btn btn-primary btn-lg btn-block mb-3"
                  type="submit"
                >
                  {' '}
                  Get Lyrics
                </button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
