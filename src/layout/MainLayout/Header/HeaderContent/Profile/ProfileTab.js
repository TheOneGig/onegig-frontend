import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import useAuth from 'hooks/useAuth';
import { useQuery } from 'react-query';
import { getUser } from 'hooks/users';
import useWorkspace from 'hooks/useWorkspace';
// assets
import { LogoutOutlined, UserOutlined, WalletOutlined, ControlOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = ({ handleLogout }) => {
  const { user } = useAuth();
  const userId = user.id;
  const { workspaceId } = useWorkspace();
  const { data: userInfo } = useQuery(['user'], () => getUser({ userId }));
  const history = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event, index) => {
    console.log(event);
    setSelectedIndex(index);
    if (index === 1) {
      history(`/${workspaceId}/profile/personal`);
    } else if (index === 4) {
      history('/tiers');
    } else if (index === 3) {
      history('/admin/insights');
    } else if (index === 5) {
      history('/client/home');
    }
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
      <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>

      {userInfo.role === 'ADMIN' ? (
        <>
          <ListItemButton selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
            <ListItemIcon>
              <ControlOutlined />
            </ListItemIcon>
            <ListItemText primary="Admin Site" />
          </ListItemButton>
          <ListItemButton selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 4)}>
            <ListItemIcon>
              <WalletOutlined />
            </ListItemIcon>
            <ListItemText primary="Subscription" />
          </ListItemButton>
        </>
      ) : (
        <></>
      )}
      <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
};

ProfileTab.propTypes = {
  handleLogout: PropTypes.func
};

export default ProfileTab;
