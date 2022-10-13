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
      <div
        style={ { minHeight: '100vh', width: '100%' } }
        className="row justify-content-center align-items-center search-wallpaper"
      >
        <section
          className="container
          align-content-center col-10 col-md-6 col-lg-5 rounded-3 p-4 shadow bg-light"
          data-testid="page-search"
        >
          <span className="fs-3 title">Search</span>
          <Header />
          <form className="my-4">
            <div className="input-group mb-3">
              <span
                className="input-group-text username"
              >
                {/* <i className="fa-duotone fa-magnifying-glass"></i> */}
              </span>
              <input
                id="search-input"
                className="form-control input"
                data-testid="search-artist-input"
                placeholder="Ariana Grande"
                onChange={ this.verifyChararcters }
                value={ searchInput }
              />
            </div>
            <button
              type="submit"
              data-testid="search-artist-button"
              className="btn btn-dark submit mt-2"
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
        </section>
      </div>
    );
  }
}

export default Search;
