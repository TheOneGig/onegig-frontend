import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Tooltip, Flex, Blockquote, Col } from '@mantine/core';
import IconButton from 'components/@extended/IconButton';
import { IconInfoCircle, IconX } from '@tabler/icons-react';
import { Button } from '@mui/material'
import ContractCreate from './drawerCreate';
import useAuth from 'hooks/useAuth';
import useWorkspace from 'hooks/useWorkspace';
import { getWorkspaceTemplates } from 'hooks/templates';
import { getWorkspaceClients } from 'hooks/clients';
import { getWorkspaceContracts } from 'hooks/contracts';
import { getWorkspaceProjects } from 'hooks/projects';
import {useTheme} from '@mui/material';
import ContractTabs from './tabs';

const ContractsTable = ({ striped }) => {
  const [opened, setOpened] = useState(false);
  const theme = useTheme();
  const { user } = useAuth();
  const { workspaceId } = useWorkspace();
  const [closeBloque, setCloseBlock] = useState(false)
  const userId = user.id;
  const icon = <IconInfoCircle style={{color: theme.palette.primary.main}} />;
  const { data: contracts, isLoading, refetch } = useQuery(['contracts'], () => getWorkspaceContracts({ workspaceId }));
  const { data: templates, isLoading: loadingTemplates } = useQuery(['templates'], () => getWorkspaceTemplates({ workspaceId }));
  const { data: clients, isLoading: loadingClients } = useQuery(['clients'], () => getWorkspaceClients({ workspaceId }));
  const { data: projects, isLoading: loadingProjects} = useQuery(['projects'], () => getWorkspaceProjects({ workspaceId }));
  if (isLoading || loadingProjects || loadingTemplates || loadingClients) {
    return <div>Loading Contracts...</div>;
  }

  const clientData = clients.map((client) => ({ value: client.clientId, label: `${client.firstName}${client.lastName}` }));
  const filteredProjects = projects.map((project) => {
    if (project.payments?.length > 0) {
      if (project.status !== 'ARCHIVED' && project.status !== 'LEAD') {
        return project;
      } else {
        return null;
      }
    } else {
      return project;
    }
  });
  const handleDelete  = () => {
      setCloseBlock(true)
  }

  return (
    <>
   
      <Flex mb={20} gap="md" justify="center" align="flex-start" direction="column" wrap="wrap">
        <Flex style={{ position: 'relative' }}>
        <Blockquote   style={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: 15,
          borderLeft: `4px solid ${theme.palette.primary.main}`,
          display: closeBloque ? 'none' : '',
          letterSpacing: 0
        }} radius="lg" iconSize={30} icon={icon} mb='lg' >
        <h3>Welcome to the Contract Page!</h3>
        <p>Welcome to your centralized platform for contract management. On this page, you have the ability to create, send, and manage all your contracts. You can easily send contracts to your clients for their review and digital signature. Additionally, you can monitor the status of each contract, from creation to completion, making the entire process seamless and efficient.</p>
        </Blockquote>
      <IconButton
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          display: closeBloque ? 'none' : ''
        }}
        onClick={handleDelete}
      >
        <IconX />
      </IconButton>
     </Flex>
        <Tooltip
          label="Create a new contract "
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
          <Button onClick={() => setOpened(true)} variant="contained">
            New Contract
          </Button>
        </Tooltip>
      </Flex>
      <ContractTabs contractData={contracts} refetch={refetch} striped={striped} />
      <ContractCreate
        opened={opened}
        refetch={refetch}
        clients={clientData}
        templates={templates}
        setOpened={setOpened}
        workspaceId={workspaceId}
        userId={userId}
        filteredProjects={filteredProjects}
      />
    </>
  );
};

ContractsTable.propTypes = {
  data: PropTypes.array,
  striped: PropTypes.bool,
  rowData: PropTypes.object
};
export default ContractsTable;
