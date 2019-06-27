import React from 'react';

export default function Track(props) {
  const { track } = props;
  return (
    <div className="col-md-6">
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5>{track.artist_name}</h5>
          <p className="card-text">
            <strong>
              <i className="fas fa-play" /> Track
            </strong>
            :{track.track_name}
            <br />
            <strong>
              <i className="fas fa-play" /> Album
            </strong>
            :{track.album_name}
          </p>
        </div>
      </div>
    </div>
  );
}
