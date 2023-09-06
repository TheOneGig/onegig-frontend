import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Button, Tooltip, Flex } from '@mantine/core';
import ContractCreate from './drawerCreate';
import useAuth from 'hooks/useAuth';
import useWorkspace from 'hooks/useWorkspace'
import { getWorkspaceGigs } from 'hooks/gigs';
import { getWorkspaceTemplates } from 'hooks/templates';
import { getWorkspaceClients } from 'hooks/clients';
import { getWorkspaceContracts } from 'hooks/contracts';
import ContractTabs from './tabs';

const ContractsTable = ({ striped }) => {
  const [opened, setOpened] = useState(false);
  const { user } = useAuth();
  const { workspaceId } = useWorkspace();
  const userId = user.id;
  const { data: contracts, isLoading, refetch } = useQuery(['contracts'], () => getWorkspaceContracts({ workspaceId }));
  const { data: templates, isLoading: loadingTemplates } = useQuery(['templates'], () => getWorkspaceTemplates({ workspaceId }));
  const { data: gigs, isLoading: loadingGigs } = useQuery(['gigs'], () => getWorkspaceGigs({ workspaceId }));
  const { data: clients, isLoading: loadingClients } = useQuery(['clients'], () => getWorkspaceClients({ workspaceId }));
  if (isLoading || loadingGigs || loadingTemplates || loadingClients) {
    return <div>Loading Contracts...</div>;
  }

  const clientData = clients.map((client) => ({ value: client.clientId, label: `${client.firstName}${client.lastName}` }));
  const gigOptions = gigs.filter((gig) => gig.published == true).map((gig) => ({ value: gig.name, label: gig.name }));

  return (
    <>
      <Flex mb={20} gap="md" justify="center" align="flex-start" direction="column" wrap="wrap">
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
          <Button onClick={() => setOpened(true)} className="create-btn blue-btn" variant="light">
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
        gigOptions={gigOptions}
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
