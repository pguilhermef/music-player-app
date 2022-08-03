import React from 'react';
import PropTypes from 'prop-types';
import AlbumMusics from '../components/MusicCard';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumMusics: [],
      albumName: '',
      albumArtist: '',
      albumNamePhoto: '',
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const apiMusics = await getMusics(id);
    const albumName = apiMusics[0].collectionName;
    const albumArtist = apiMusics[0].artistName;
    const albumNamePhoto = apiMusics[0].artworkUrl100;

    this.setState({
      albumMusics: apiMusics,
      albumName,
      albumArtist,
      albumNamePhoto,
    });
  }

  render() {
    const {
      albumMusics,
      albumName,
      albumArtist,
      albumNamePhoto,
    } = this.state;

    return (
      <section data-testid="page-album">
        <h1>Album</h1>
        <Header />
        <div>
          <img src={ albumNamePhoto } alt={ albumName } />
          <p
            data-testid="artist-name"
          >
            {albumArtist}
          </p>
          <p
            data-testid="album-name"
          >
            {albumName}
          </p>
          <AlbumMusics musics={ albumMusics } />
        </div>
      </section>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
