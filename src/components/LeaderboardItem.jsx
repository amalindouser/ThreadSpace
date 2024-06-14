import React, { useContext, useMemo, createContext } from 'react';
import { Image, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const UserContext = createContext();

function UserProvider({ children, currentUser }) {
  return <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>;
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #E2E8F0',
    padding: '16px',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  userName: {
    fontSize: '16px',
    color: 'black',
    fontFamily: 'Montserrat',
  },
  score: {
    fontSize: '16px',
    color: 'black',
    fontFamily: 'Montserrat',
  },
};

function LeaderboardItem({ user, score, isTopUser = false }) {
  const currentUser = useContext(UserContext);
  const isCurrentUser = useMemo(() => currentUser?.id === user.id, [currentUser, user.id]);

  const displayName = isCurrentUser ? `${user.name} (you)` : user.name;
  const avatarColor = isTopUser ? 'yellow' : 'grey';
  const fontWeight = isTopUser ? 'bold' : 'normal';

  return (
    <div style={styles.container}>
      <div style={styles.userInfo}>
        <Image src={user.avatar} avatar style={{ backgroundColor: avatarColor }} />
        <div style={{ fontWeight, ...styles.userName }}>
          {displayName}
          {isTopUser && <Icon name="star" color="yellow" />}
        </div>
      </div>
      <div style={{ fontWeight, ...styles.score }}>{score}</div>
    </div>
  );
}

LeaderboardItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  score: PropTypes.number.isRequired,
  isTopUser: PropTypes.bool,
};

LeaderboardItem.defaultProps = {
  isTopUser: false,
};

export default LeaderboardItem;
