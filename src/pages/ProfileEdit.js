import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      name: '',
      email: '',
      image: '',
      description: '',
      isSaveButtonDisabled: true,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      name: user.name,
      email: user.email || '',
      image: user.image || '',
      description: user.description || '',
    }, () => {
      this.loadingState();
      this.validateSubmit();
    });
  }

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value }
    ), () => this.validateSubmit());
  }

  validateSubmit = () => {
    const {
      name,
      email,
      image,
      description,
    } = this.state;
    console.log(name, email, image, description);
    const minLength = 3;
    if ([name.length, email.length, image.length, description.length]
      .some((val) => val < minLength)
      || (!email.includes('@') && (!email.includes('.com')))) {
      return this.setState({
        isSaveButtonDisabled: true,
      });
    } this.setState({
      isSaveButtonDisabled: false,
    });
  }

  onSaveClick = async (e) => {
    const { name, email, image, description } = this.state;
    e.preventDefault();
    await updateUser({ name, email, image, description });
    const { history } = this.props;
    history.push('/profile');
  }

  loadingState = () => this.setState(({ loading }) => ({ loading: !loading }));

  render() {
    const { loading, name, email, image, description, isSaveButtonDisabled } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading /> : (
          <form onSubmit={ this.onClick }>
            <input
              type="text"
              name="name"
              data-testid="edit-input-name"
              value={ name }
              onChange={ this.onChange }
            />
            <input
              type="email"
              name="email"
              data-testid="edit-input-email"
              placeholder={ `${name.toLowerCase()}@email.com` }
              value={ email }
              onChange={ this.onChange }
            />
            <textarea
              name="description"
              cols="30"
              rows="1"
              data-testid="edit-input-description"
              placeholder={ `Eu sou o ${name}. Amo escutar músicas nesse site!` }
              value={ description }
              onChange={ this.onChange }
            />
            <input
              type="url"
              name="image"
              data-testid="edit-input-image"
              value={ image }
              onChange={ this.onChange }
            />
            <button
              type="submit"
              data-testid="edit-button-save"
              onClick={ this.onSaveClick }
              disabled={ isSaveButtonDisabled }
            >
              Editar perfil
            </button>
          </form>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
