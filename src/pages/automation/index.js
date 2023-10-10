import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Tooltip, Flex } from '@mantine/core';
import { Button } from '@mui/material'
import useAuth from 'hooks/useAuth';
import { getClients } from 'hooks/clients';
import useWorkspace from 'hooks/useWorkspace';
import NewAuto from './NewAuto';

const Automation = () => {
  const [opened, setOpened] = useState(false);
  const { user } = useAuth();
  const { workspaceId } = useWorkspace();
  const userId = user.id;
  const { data: clients, isLoading, refetch } = useQuery(['clients'], () => getClients({ userId }));
  if (isLoading) {
    return <div>Loading Automation Templates...</div>;
  }
  console.log(clients);
  return (
    <> 
     {  opened ? 
        <> 
        
            <NewAuto opened={opened} workspaceId={workspaceId} refetch={refetch} setOpened={setOpened} userId={userId} />
        </>  
        : 
        <> 
            <Flex mb={20} gap="md" justify="center" align="flex-start" direction="column" wrap="wrap">
                <Tooltip
                label="Create a new Automation Template "
                position="right"
                transition="fade"
                style={{
                    backgroundColor: '#484848',
                    borderRadius: 6,
                    padding: '12px 16px',
                    color: '#fff',
                    fontSize: 12,
                    transition: 0.3
                }}
                >
                <Button onClick={() => setOpened(true)}  variant="contained">
                    New Automation
                </Button>
                </Tooltip>
            </Flex>

            
        </>
     }
     
    </>
  );
};

Automation.propTypes = {
  data: PropTypes.array,

};
export default Automation;
