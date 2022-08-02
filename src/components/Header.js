import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loadingPage: false,
    };
  }

  async componentDidMount() {
    this.setState({
      loadingPage: true,
    }, async () => {
      const userName = await getUser();
      this.setState({
        name: userName.name,
        loadingPage: false,
      });
    });
  }

  render() {
    const { name, loadingPage } = this.state;
    return (
      <header data-testid="header-component">
        { loadingPage ? <Loading />
          : (
            <p data-testid="header-user-name">{ name }</p>
          ) }
      </header>
    );
  }
}

export default Header;
