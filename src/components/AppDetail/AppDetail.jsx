import React, { Component } from 'react';

import UserListItem from 'src/components/UserListItem';

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
    if (users.id === id) {
      if (users.loading && users.list.length === 0) {
        return (
          <div className="center">Loading users list...</div>
        );
      }
      return users.list.map(user => (
        <UserListItem user={user} key={user.id} />
      ));
    }
    return null;
  }

  renderUserListPageButtons = () => {
    const { users } = this.props;
    const { id } = this.state;
    const canIncrease = users.list.length >= 25;
    const canDecrease = users.page > 0;

    return (
      <div className="center">
        <button
          className="button"
          onClick={() => { this.props.getUsers(id, users.page - 1); }}
          disabled={!canDecrease}
        >
          Previous
        </button>
        <button
          className="button"
          onClick={() => { this.props.getUsers(id, users.page + 1); }}
          disabled={!canIncrease}
        >
          Next
        </button>
      </div>
    );
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
          {this.renderUserListPageButtons()}
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
