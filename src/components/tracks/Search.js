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
  render() {
    return (
      <Consumer>
        {value => {
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-5 text-center text-capitalize">
                <i className="fas fa-music" /> Search for your favorite song
              </h1>
              <p className="lead text-center">Get the lyrics now</p>
              <form>
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
                  className="btn btn-primary btn-lg btn-block mb-5"
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
