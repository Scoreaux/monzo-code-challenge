import React from 'react';

import styles from './UserListItem.scss';

const UserListItem = ({ user = {} }) => (
  <div className={`${styles.item} mb1`}>
    <div className={`${styles.icon} mr2`}>
      <img src={user.avatar} alt={user.name} />
    </div>
    <div className={styles.name}>
      {user.name}
    </div>
    <div className={styles.created}>
      {user.email ? user.email.toLowerCase() : ''}
    </div>
  </div>
);

export default UserListItem;
