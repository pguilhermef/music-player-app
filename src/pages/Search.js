import React from 'react';
import ArtistAlbuns from '../components/ArtistAlbuns';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artist: '',
      albuns: [],
      searchInput: '',
      buttonIsDisabled: true,
      activateAlbuns: false,
      loadingPage: false,
    };
  }

  verifyChararcters = ({ target }) => {
    const { value } = target;
    const minNumber = 2;
    const minimumCharactersReached = value.length < minNumber;

    this.setState({
      searchInput: value,
      buttonIsDisabled: minimumCharactersReached,
    });
  }

  clickButton = (e) => {
    const { searchInput } = this.state;
    e.preventDefault();

    this.setState({
      loadingPage: true,
    }, async () => {
      const artistAlbuns = await searchAlbumsAPI(searchInput);
      this.setState({
        artist: searchInput,
        searchInput: '',
        albuns: artistAlbuns,
        activateAlbuns: true,
        loadingPage: false,
      });
    });
  };

  render() {
    const {
      buttonIsDisabled,
      searchInput,
      artist,
      albuns,
      activateAlbuns,
      loadingPage,
    } = this.state;

    return (
      <div data-testid="page-search">
        <h1>Search</h1>
        <Header />

        <form>
          <label
            htmlFor="search-input"
          >
            <input
              id="search-input"
              data-testid="search-artist-input"
              onChange={ this.verifyChararcters }
              value={ searchInput }
            />
          </label>

          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ buttonIsDisabled }
            onClick={ this.clickButton }
          >
            Pesquisar
          </button>
        </form>

        { loadingPage ? <Loading /> : (
          <section>
            {activateAlbuns
              ? (
                <ArtistAlbuns
                  artist={ artist }
                  albuns={ albuns }
                />
              )
              : <p>Pesquise um album ou artista!</p>}
          </section>
        ) }
      </div>
    );
  }
}

export default Search;
