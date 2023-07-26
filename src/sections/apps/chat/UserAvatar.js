import PropTypes from 'prop-types';

// material-ui
import { Badge } from '@mui/material';

// project imports
import AvatarStatus from './AvatarStatus';
import Avatar from 'components/@extended/Avatar';

// assets
const avatarImage = require.context('assets/images/users', true);

// ==============================|| CHAT USER AVATAR WITH STATUS ICON ||============================== //

const UserAvatar = ({ user }) => {
  if (user.avatar) {
    return (
      <Badge
        overlap="circular"
        badgeContent={<AvatarStatus status={user.online_status} />}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        sx={{ '& .MuiBox-root': { width: 6, height: 6 }, padding: 0, minWidth: 12, '& svg': { background: '#fff', borderRadius: '50%' } }}
      >
        <Avatar alt={user.name} src={user.avatar && avatarImage(`./${user.avatar}`)} />
      </Badge>
    );
  } else {
    return (
      <Badge
        overlap="circular"
        badgeContent={<AvatarStatus status={user.online_status} />}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        sx={{
          '& .MuiBox-root': { width: 6, height: 6 },
          padding: 0,
          minWidth: 12,
          '& svg': { backgroundColor: '#fff', borderRadius: '50%' }
        }}
      >
        {user.fname && user.fname.charAt(0)} {user.lname && user.lname.charAt(0)}
      </Badge>
    );
  }
};

UserAvatar.propTypes = {
  user: PropTypes.object
};

export default UserAvatar;
