import PropTypes from 'prop-types';
import React from 'react';
import { useQuery } from 'react-query';
import { Tooltip, Flex } from '@mantine/core';
import useAuth from 'hooks/useAuth';
import { getContracts } from 'hooks/contracts';
import ContractTabs from './tabs';

const ContractsTable = ({ striped }) => {
  const { user } = useAuth();
  const userId = user.id;
  const { data: contracts, isLoading, refetch } = useQuery(['contracts'], () => getContracts({ userId }));
  if (isLoading) {
    return <div>Loading Contracts...</div>;
  }

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
          <h1>Contracts</h1>
        </Tooltip>
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
