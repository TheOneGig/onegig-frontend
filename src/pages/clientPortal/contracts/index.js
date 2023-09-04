import PropTypes from 'prop-types';
import React from 'react';
import { useQuery } from 'react-query';
import useClient from 'hooks/useClient';
import { Flex, Title } from '@mantine/core';
import { getClientContracts } from 'hooks/contracts';
import ContractTabs from './tabs';

const ContractsTable = ({ striped }) => {
  const { clientId } = useClient();
  const { data: contracts, isLoading, refetch } = useQuery(['contracts'], () => getClientContracts({ clientId }));
  if (isLoading) {
    return <div>Loading Contracts...</div>;
  }

  return (
    <>
      <Flex mb={20} gap="md" justify="center" align="flex-start" direction="column" wrap="wrap">
        <Title sx={{ marginBottom: '15px' }}>Active Projects</Title>
      </Flex>
      <ContractTabs contractData={contracts} refetch={refetch} striped={striped} />
    </>
  );
};

ContractsTable.propTypes = {
  data: PropTypes.array,
  striped: PropTypes.bool,
  rowData: PropTypes.object
};
export default ContractsTable;
