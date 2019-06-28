import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
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
      .then(res => {
        this.setState({ lyrics: res.data.message.body.lyrics.lyrics_body });
        return axios.get(
          `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${
            this.props.match.params.id
          }&apikey=${process.env.REACT_APP_MM_KEY}`
        );
      })
      .then(res => {
        this.setState({ track: res.data.message.body.track });
      })
      .catch(res => console.log(res));
  }
  render() {
    const { track, lyrics } = this.state;

    if (
      track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <>
          <div className="card">
            <h5 className="card-header">
              {track.track_name} by{' '}
              <span className="text-secondary">{track.artist_name}</span>
            </h5>
            <div className="card-body">
              <p className="card-text">{lyrics}</p>
            </div>
          </div>

          <ul className="list-group mt-3">
            <li className="list-group-item">
              Album Name: <strong>{track.album_name}</strong>
            </li>
            <li className="list-group-item">
              Genre:{' '}
              <strong>
                {track.primary_genres.music_genre_list.length === 0
                  ? 'GENRE Not AVAILABLE'
                  : track.primary_genres.music_genre_list[0].music_genre
                      .music_genre_name}
              </strong>
            </li>
            <li className="list-group-item">
              <strong>Explicit Words</strong>:{' '}
              {track.explicit === 0 ? 'No' : 'Yes'}
            </li>
            <li className="list-group-item">
              <strong>Release Date</strong>:{' '}
              <Moment format="MMMM DD, YYYY">{track.first_release_date}</Moment>
            </li>
            <li className="list-group-item">
              <a href={`${track.track_share_url}`}>
                View Full Lyrics on MusixMatch
              </a>
            </li>
          </ul>
          <Link to="/" className="btn btn-dark btn-sm mt-4">
            Go Back
          </Link>
        </>
      );
    }
  }
}
