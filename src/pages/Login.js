import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      buttonIsDisabled: true,
      loadingPage: false,
    };
  }

  verifyChararcters = ({ target }) => {
    const { value } = target;
    const minNumber = 3;
    const minimumCharactersReached = value.length < minNumber;

    this.setState({
      name: value,
      buttonIsDisabled: minimumCharactersReached,
    });
  }

  submitButton = () => {
    this.setState({ loadingPage: true }, async () => {
      const { name } = this.state;
      const { history } = this.props;
      await createUser({
        name,
      });
      history.push('/search');
    });
  }

  render() {
    const {
      buttonIsDisabled,
      loadingPage,
    } = this.state;

    return (
      <div
        style={ { height: '100vh', width: '100%' } }
        className="row justify-content-center align-items-center login-wallpaper"
      >
        <section
          className="container
          align-content-center col-10 col-md-6 col-lg-4 rounded-3 p-4 shadow bg-light"
          data-testid="page-login"
        >
          { loadingPage ? <Loading />
            : (
              <>
                <span className="fs-3 title">Login</span>
                <form className="my-4">
                  <div className="input-group mb-3">
                    <span
                      className="input-group-text username"
                    >
                      <i className="far fa-user-circle fa-lg" />
                    </span>
                    <input
                      name="userName"
                      className="form-control input"
                      id="login-name-input"
                      placeholder="Nome"
                      data-testid="login-name-input"
                      onChange={ this.verifyChararcters }
                    />

                  </div>
                </form>
                <button
                  type="submit"
                  className="btn btn-dark submit mt-2"
                  data-testid="login-submit-button"
                  disabled={ buttonIsDisabled }
                  onClick={ this.submitButton }
                >
                  Entrar
                </button>

              </>
            )}
        </section>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
