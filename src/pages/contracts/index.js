import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Button, Text, Tooltip, Title, Flex, } from '@mantine/core';
import ContractCreate from './drawerCreate';
import useAuth from 'hooks/useAuth';
import { getGigs } from 'hooks/gigs';
import { getTemplates } from 'hooks/templates';
import { getContracts } from 'hooks/contracts';
import ContractTabs from './tabs'

const ContractsTable = ({ striped }) => {
  const [opened, setOpened] = useState(false);
  const { user } = useAuth();
  const userId = user.id;
  const { data: contracts, isLoading, refetch } = useQuery(
    ['contracts'],
    () => getContracts({ userId }), 
  ) ;  
  const { data: templates, isLoading:loadingTemplates, refetch: refetchTemplates } = useQuery(['templates'], () => getTemplates({ userId })) ; 
  const { data: gigs, isLoading: loadingGigs, refetch: refetchGigs } = useQuery(['gigs'], () => getGigs({ userId }));
  if (isLoading || loadingGigs || loadingTemplates) {
    return <div>Loading Contracts...</div>;
  }
 
  const contractData = contracts.map((contract) => contract);

  const gigOptions = gigs
  .filter((gig) => gig.published == true)
  .map((gig) => ({ value: gig.name, label: gig.name }));


  return (
    <>
      <Flex mih={100} mb={20} gap="md" justify="center" align="flex-start" direction="column" wrap="wrap">
        <Title h={40}>Welcome to the Contracts Hub!</Title>
        <Tooltip label="Create a new contract "
          position="right"
          transition="fade"
          style={{
            backgroundColor: '#3333',
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
        <Text weight={500} >Manage your professional agreements effortlessly in one centralized location.
           Create, review, and track the progress of all your contracts with ease. 
        </Text>
      </Flex>
      <ContractTabs contractData={contractData} refetch={refetch} striped={striped}  />
      <ContractCreate opened={opened} refetch={refetch} templates={templates} setOpened={setOpened} userId={userId} gigOptions={gigOptions} />
   </>
  );
};

ContractsTable.propTypes = {
  data: PropTypes.array,
  striped: PropTypes.bool,
  rowData: PropTypes.object,
};
export default ContractsTable;
