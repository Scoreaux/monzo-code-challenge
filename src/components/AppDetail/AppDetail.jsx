import React, { Component } from 'react';

class AppDetail extends Component {
  static defaultProps = {
    getApps: () => {},
    apps: {
      list: [],
      loading: false,
      message: null,
    },
    computedMatch: {
      params: {},
    },
  }

  state = {
    app: null,
    id: null,
  }

  componentDidMount() {
    this.props.getApps();
  }

  static getDerivedStateFromProps(props, prevState) {
    const { id } = props.computedMatch.params;
    const app = props.apps.list.find(item => item.id === id);

    // If app ID changes, get first page of users
    if (app && ((prevState.app && prevState.app.id !== app.id) || !prevState.app)) {
      props.getUsers(id);
    }

    return {
      app,
      id,
    };
  }

  renderUserListItems = () => {
    const { users } = this.props;
    const { id } = this.state;
    if (users.id === id);
    return users.list.map(item => (
      <div>{JSON.stringify(item)}</div>
    ));
  }

  render() {
    const { apps } = this.props;
    const { app, id } = this.state;

    if (app) {
      return (
        <div>
          <h2>{app.name}</h2>
          <p>{app.created}</p>
          {this.renderUserListItems()}
        </div>
      );
    } else if (apps.loading) {
      return (
        <div className="center">Loading app details...</div>
      );
    }
    return (
      <div className="message error">
        An app with id {id} could not be found.
      </div>
    );
  }
}

export default AppDetail;
