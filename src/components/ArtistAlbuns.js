import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ArtistAlbuns extends React.Component {
  render() {
    const { artist, albuns } = this.props;

    return (
      <section>
        { albuns.length > 0
          ? (
            <>
              <p>
                Resultado de álbuns de:
                {' '}
                {artist}
              </p>
              <div>
                {albuns
                  .map(({ artistName, collectionId, collectionName, artworkUrl100 }) => (
                    <div
                      key={ collectionId }
                    >
                      <img src={ artworkUrl100 } alt={ collectionName } />

                      <div>{collectionName}</div>

                      <div>{artistName}</div>

                      <Link
                        data-testid={ `link-to-album-${collectionId}` }
                        to={ `/album/${collectionId}` }
                      >
                        Mais informações
                      </Link>
                    </div>))}
              </div>
            </>
          ) : <p>Nenhum álbum foi encontrado</p>}
      </section>
    );
  }
}

ArtistAlbuns.propTypes = {
  artist: PropTypes.string.isRequired,
  albuns: PropTypes.shape({
    map: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired,
  }).isRequired,
};

export default ArtistAlbuns;
