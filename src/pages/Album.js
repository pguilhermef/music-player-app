import React from 'react';
import PropTypes from 'prop-types';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumMusics: [],
      albumInfos: '',
      loadingPage: true,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const apiMusics = await getMusics(id);
    const resultOfMusics = apiMusics.slice(1);
    const resultOfInfos = apiMusics[0];

    this.setState({
      albumMusics: resultOfMusics,
      albumInfos: resultOfInfos,
    }, () => this.setState({ loadingPage: false }));
  }

  render() {
    const {
      albumMusics,
      albumInfos: {
        artistName,
        collectionName,
        artworkUrl100,
      },
      loadingPage,
    } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        {loadingPage ? <Loading /> : (
          <div>
            <img src={ artworkUrl100 } alt={ collectionName } />
            <h2 data-testid="artist-name">{artistName}</h2>
            <h3 data-testid="album-name">{collectionName}</h3>
            <div>
              {albumMusics.map(({ trackId, trackName, previewUrl }, index) => (
                <div key={ trackId }>
                  <MusicCard
                    trackName={ trackName }
                    previewUrl={ previewUrl }
                    trackId={ trackId }
                    albumMusics={ albumMusics }
                    index={ index }
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
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
