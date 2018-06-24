import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import styles from './AppListItem.scss';

const AppListItem = ({ app = {} }) => (
  <Link to={`/apps/${app.id}`}>
    <div className={`${styles.item} mb1`}>
      <div className={`${styles.icon} mr2`}>
        <img src={app.logo} alt={app.name} />
      </div>
      <div className={styles.name}>
        {app.name}
      </div>
      <div className={styles.created}>
        created {moment(app.created).fromNow()}
      </div>
    </div>
  </Link>
);

export default AppListItem;
