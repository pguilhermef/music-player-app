import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      // name: '',
      buttonIsDisabled: true,
    };
  }

  verifyChararcters = ({ target }) => {
    const { value } = target;
    const minNumber = 2;
    const minimumCharactersReached = value.length < minNumber;

    this.setState({
      // name: value,
      buttonIsDisabled: minimumCharactersReached,
    });
  }

  render() {
    const { buttonIsDisabled } = this.state;
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
            />
          </label>

          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ buttonIsDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
