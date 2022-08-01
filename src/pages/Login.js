import React from 'react';
import Loading from '../component/Loading';
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
      <section data-testid="page-login">
        { loadingPage ? <Loading />
          : (
            <>
              <h1>Login</h1>
              <label htmlFor="login-name-input">
                Usuário
                <input
                  id="login-name-input"
                  placeholder="Rajadinha123"
                  data-testid="login-name-input"
                  onChange={ this.verifyChararcters }
                />
              </label>
              <button
                type="submit"
                data-testid="login-submit-button"
                disabled={ buttonIsDisabled }
                onClick={ this.submitButton }
              >
                Entrar
              </button>

            </>
          )}
      </section>
    );
  }
}

export default Login;
