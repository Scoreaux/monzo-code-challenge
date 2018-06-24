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
  }

  componentDidMount() {
    this.props.getApps();
  }

  static getDerivedStateFromProps(props) {
    const { id } = props.computedMatch.params;
    return {
      app: props.apps.list.find(app => app.id === id),
    };
  }

  render() {
    const { computedMatch, apps } = this.props;
    const { app } = this.state;

    if (app) {
      return (
        <div>
          <h2>{app.name}</h2>
          <p>{app.created}</p>
        </div>
      );
    } else if (apps.loading) {
      return (
        <div className="center">Loading app details...</div>
      );
    }
    return (
      <div className="message error">
        An app with id {computedMatch.params.id} could not be found.
      </div>
    );
  }
}

export default AppDetail;
