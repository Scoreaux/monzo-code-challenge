import React, { Component } from 'react';

import styles from './Authenticate.scss';

class Authenticate extends Component {
  state = {
    username: '',
    password: '',
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit = () => {
    this.props.signIn(this.state);
  }

  render() {
    const { auth } = this.props;
    const { username, password } = this.state;

    return (
      <div className={styles.container}>
        <h2>Sign In</h2>
        {auth.message &&
          <div className={`${styles.message} mb1`}>
            {auth.message}
          </div>
        }
        <form onSubmit={(e) => { e.preventDefault(); }}>
          <input
            className="textInput mb1"
            type="text"
            name="username"
            value={username}
            onChange={this.onChange}
          />
          <input
            className="textInput mb1"
            type="password"
            name="password"
            value={password}
            onChange={this.onChange}
          />
          <input
            type="submit"
            className="button"
            onClick={this.onSubmit}
            disabled={auth.loading}
            value={auth.loading ? 'Signing in...' : 'Sign In'}
          />
        </form>
      </div>
    );
  }
}

export default Authenticate;
