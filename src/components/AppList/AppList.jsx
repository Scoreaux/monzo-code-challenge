import React, { Component } from 'react';

const AppListItem = props => (
  <div>{props.app.id}, {props.app.name}</div>
);

class AppList extends Component {
  static defaultProps = {
    getApps: () => {},
    apps: {
      list: [],
      loading: false,
      message: null,
    }
  }

  componentDidMount() {
    this.props.getApps();
  }

  renderAppListItems() {
    const { list = [] } = this.props.apps;

    return list.map(app => (
      <AppListItem app={app} key={app.id} />
    ));
  }

  render() {
    const { apps } = this.props;
    return (
      <div>
        <h2>Apps</h2>
        {apps.message &&
          <div className="message error mb1">
            {apps.message}
          </div>
        }
        {apps.loading ?
          <div className="center">Loading apps...</div>
          :
          this.renderAppListItems()
        }
      </div>
    );
  }
}

export default AppList;
