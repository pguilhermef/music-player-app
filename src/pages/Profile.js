import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: {
        name: '',
        email: '',
        image: '',
        description: '',
      },
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user }, () => this.loadingState());
  }

  loadingState = () => this.setState(({ loading }) => ({ loading: !loading }));

  render() {
    const { loading, user } = this.state;
    const { name, email, image, description } = user;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Loading /> : (
          <div>
            <img src={ image } alt={ name } data-testid="profile-image" />
            <Link to="/profile/edit">Editar perfil</Link>
            <p>{ name }</p>
            <p>{ email }</p>
            <p>{ description }</p>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
