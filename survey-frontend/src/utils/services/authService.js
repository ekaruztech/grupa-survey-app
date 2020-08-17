import store from '../../redux/store';

class AuthService {
  constructor() {
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.getCustomerSession = this.getCustomerSession.bind(this);
  }

  getCustomerSession() {
    const { getState } = store;
    const { auth } = getState();
    return auth.session;
  }

  isLoggedIn() {
    const { getState } = store;
    const { auth } = getState();

    return (
      auth.session &&
      auth.sessionTimeExpiration &&
      auth.sessionTimeExpiration > new Date().getTime() / 1000
    );
  }
}

export default new AuthService();
