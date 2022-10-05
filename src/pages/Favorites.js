import React, { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      getSongs: [],
    };
  }

  componentDidMount = () => this.checkFavorite();

  checkFavorite = async () => {
    this.loadingState();
    const getSongs = await getFavoriteSongs();
    this.setState({ getSongs }, () => this.loadingState());
  }

  loadingState = () => this.setState(({ loading }) => ({ loading: !loading }));

  render() {
    const { loading, getSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? <Loading /> : (
          getSongs.map((favorites, index) => (
            <MusicCard
              key={ favorites.trackId }
              trackName={ favorites.trackName }
              previewUrl={ favorites.previewUrl }
              trackId={ favorites.trackId }
              musicList={ getSongs }
              index={ index }
            />
          ))
        )}
      </div>
    );
  }
}

export default Favorites;
