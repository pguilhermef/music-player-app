import React from 'react';
import PropTypes from 'prop-types';

class AlbumMusics extends React.Component {
  render() {
    const { musics } = this.props;

    return (
      <section>
        <div>
          { musics
            .filter((music) => music !== musics[0])
            .map((
              {
                trackName,
                previewUrl,
              },
            ) => (
              <div
                key={ trackName }
              >
                <div>{trackName}</div>

                <audio
                  data-testid="audio-component"
                  src={ previewUrl }
                  controls
                >
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  {' '}
                  <code>audio</code>
                  .
                </audio>
              </div>))}
        </div>
      </section>
    );
  }
}

AlbumMusics.propTypes = {
  musics: PropTypes.shape({
    map: PropTypes.func.isRequired,
    filter: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired,
    collectionId: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default AlbumMusics;
