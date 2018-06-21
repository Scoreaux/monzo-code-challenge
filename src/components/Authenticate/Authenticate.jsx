import React, { Component } from 'react';

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
      <div>
        {auth.message &&
          <p>{auth.message}</p>
        }
        <input type="text" name="username" value={username} onChange={this.onChange} />
        <input type="password" name="password" value={password} onChange={this.onChange} />
        <button onClick={this.onSubmit} disabled={auth.loading}>Sign In</button>
        {auth.accessToken &&
          <p>{auth.accessToken}</p>
        }
      </div>
    );
  }
}

export default Authenticate;
