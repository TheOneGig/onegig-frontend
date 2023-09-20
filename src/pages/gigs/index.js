import { useState } from 'react';
import { useQuery } from 'react-query';
// material-ui
import { Flex, Grid, Title, Tooltip } from '@mantine/core';
import { Button } from '@mui/material'

import { useTheme } from '@mui/material/styles';
import useAuth from 'hooks/useAuth';
import { getWorkspaceGigs } from 'hooks/gigs';
import GigCreate from './drawerCreate';

import GigCard from './gigCard';
import useWorkspace from 'hooks/useWorkspace';
import GigEdit from './drawerEdit';

// ==============================|| GIGS ||============================== //

const Gigs = () => {
  const [opened, setOpened] = useState(false);
  const { workspaceId } = useWorkspace();
  const [openedEdit, setOpenedEdit] = useState(false);
  const theme = useTheme();
  const [selectedGig, setSelectedGig] = useState();
  const { user } = useAuth();
  const userId = user.id;
  const { data: gigs, isLoading, refetch } = useQuery(['gigs'], () => getWorkspaceGigs({ workspaceId }));
  if (isLoading) {
    return <div>Loading Proposals...</div>;
  }

  const publishedGigs = gigs.filter((gig) => gig.published);
  const unpublishedGigs = gigs.filter((gig) => !gig.published);

  function handleEdit(gig) {
    setSelectedGig(gig.gigId);
    setOpenedEdit(true);
  }

  return (
    <>
      <Flex mih={50} gap="md" justify="flex-start" align="flex-start" direction="row" wrap="wrap">
        <Tooltip
          label="Create a new proposal"
          position="right"
          transition="fade"
          style={{
            borderRadius: 6,
            padding: '12px 16px',
            color: '#fff',
            backgroundColor: '#484848',
            fontSize: 12,
            transition: 0.3
          }}
        >
          <Button onClick={() => setOpened(true)}  variant="contained">
            New Proposal
          </Button>
        </Tooltip>
      </Flex>
      <Title sx={{ marginBottom: '15px' }}>Published Proposals</Title>
      <Grid className="grid-area" sx={{ backgroundColor: theme.palette.background.paper }}>
        {publishedGigs.map((gig) => {
          return <GigCard key={gig.gigId} userId={userId} gig={gig} refetch={refetch} handleEdit={handleEdit} share />;
        })}
      </Grid>

      <Title sx={{ marginBottom: '15px', marginTop: '15px' }}>Unpublished Proposals</Title>
      <Grid className="grid-area" sx={{ backgroundColor: theme.palette.background.paper }}>
        {unpublishedGigs.map((gig) => {
          return <GigCard key={gig.gigId} userId={userId} gig={gig} refetch={refetch} handleEdit={handleEdit} share={false} />;
        })}
      </Grid>

      <GigCreate opened={opened} workspaceId={workspaceId} setOpened={setOpened} refetch={refetch} userId={userId} />
      {selectedGig && <GigEdit opened={openedEdit} setOpened={setOpenedEdit} refetch={refetch} gigId={selectedGig} gigs={gigs} />}
    </>
  );
};

export default Gigs;
