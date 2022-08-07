import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      isChecked: false,
    };
  }

  async componentDidMount() {
    const { trackId } = this.props;
    const getList = await getFavoriteSongs();
    const isChecked = getList.some((music) => music.trackId === trackId);
    this.setState({ loading: true, isChecked }, () => this.setState({ loading: false }));
  }

  isChecked = ({ target }) => {
    const { albumMusics, index } = this.props;
    if (target.checked) {
      this.setState({ isChecked: true, loading: true }, async () => {
        await addSong(albumMusics[index]);
        this.setState({ loading: false });
      });
    } else {
      this.setState({ isChecked: false, loading: true }, async () => {
        await removeSong(albumMusics[index]);
        this.setState({ loading: false }, () => {
          const { checkFavorite } = this.props;
          checkFavorite();
        });
      });
    }
  }

  render() {
    const { loading, isChecked } = this.state;
    const { trackName, previewUrl, trackId } = this.props;
    return (
      <div>
        <h4>{loading ? <Loading /> : trackName}</h4>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {previewUrl}
          <code>
            audio
          </code>
          .
        </audio>
        <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            type="checkbox"
            name="favorites"
            id={ trackId }
            onChange={ this.isChecked }
            checked={ isChecked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  albumMusics: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  index: PropTypes.number.isRequired,
  checkFavorite: PropTypes.func,
};

MusicCard.defaultProps = {
  checkFavorite: () => {},
};

export default MusicCard;
