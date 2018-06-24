import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import UserListItem from 'src/components/UserListItem';

import styles from './AppDetail.scss';

class AppDetail extends Component {
  static defaultProps = {
    getApps: () => {},
    getUsers: () => {},
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
          <div className="center mb2">Loading users list...</div>
        );
      } else if (users.message) {
        return (
          <div className="messsage error mb2">{users.message}</div>
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
          <div className="mb2">
            <Link to="/apps">Back to apps</Link>
          </div>

          <div className={`${styles.header} mb2`}>
            <div className={`${styles.icon} mr2`}>
              <img src={app.logo} alt={app.name} />
            </div>
            <div>
              <h1 style={{ margin: 0 }}>{app.name}</h1>
              <div>Created {moment(app.created).fromNow()}</div>
            </div>
          </div>

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
