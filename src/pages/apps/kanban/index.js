import { useEffect, useState } from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom';

// material-ui
import { Box, Grid, Tab, Tabs, AvatarGroup } from '@mui/material';
import { getUserStory, getUserStoryOrder, getProfiles, getComments, getItems, getColumns, getColumnsOrder } from 'store/reducers/kanban';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import Avatar from 'components/@extended/Avatar';
// project imports
import { useDispatch } from 'store';
import { openDrawer } from 'store/reducers/menu';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

// ==============================|| APPLICATION - KANBAN ||============================== //

export default function KanbanPage() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  let selectedTab = 0;
  switch (pathname) {
    case '/apps/kanban/backlogs':
      selectedTab = 1;
      break;
    case '/apps/kanban/board':
    default:
      selectedTab = 0;
  }

  const [value, setValue] = useState(selectedTab);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // hide left drawer when email app opens
    dispatch(openDrawer(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getItems());
    dispatch(getColumns());
    dispatch(getColumnsOrder());
    dispatch(getProfiles());
    dispatch(getComments());
    dispatch(getUserStory());
    dispatch(getUserStoryOrder());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Grid container spacing={1}>
        <Grid item xs={10.5}>
          <Tabs value={value} variant="scrollable" onChange={handleChange}>
            <Tab component={Link} to="/apps/kanban/board" label={value === 0 ? 'Board' : 'View as Board'} {...a11yProps(0)} />
            <Tab component={Link} to="/apps/kanban/backlogs" label={value === 1 ? 'Backlogs' : 'View as Backlog'} {...a11yProps(1)} />
          </Tabs>
        </Grid>
        <Grid item xs={1.5}>
          <AvatarGroup max={4} sx={{ justifyContent: 'start', '& .MuiAvatar-root': { width: 32, height: 32 } }}>
            <Avatar alt="Remy Sharp" src={avatar1} />
            <Avatar alt="Travis Howard" src={avatar2} />
            <Avatar alt="Cindy Baker" src={avatar3} />
            <Avatar alt="Agnes Walker" src={avatar4} />
            <Avatar alt="Travis Howard" src={avatar2} />
          </AvatarGroup>
        </Grid>
        <Grid item xs={12}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
}
