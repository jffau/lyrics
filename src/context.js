import React, { Component } from 'react';

const Context = React.createContext();

export class Provider extends Component {
  state = {
    track_list: [
      {
        track: {
          track_name: 'my song'
        }
      },
      {
        track: {
          track_name: 'song2'
        }
      }
    ],
    heading: `Top 10 Tracks ${Date.now()}`
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
