import React, { useState, useEffect, useMemo } from 'react';
import { Tabs, Button } from '@mantine/core';
import ReactTable from './table';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { useMutation } from 'react-query';
import { formatDate } from 'utils/formatDate';
import PropTypes from 'prop-types';

const ContractTabs = ({ contractData, striped, refetch }) => {
  const [activeTab, setActiveTab] = useState('Pending');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const pendingContracts = contractData.filter((contract) => contract.status === 'Pending');
  const signedContracts = contractData.filter((contract) => contract.status === 'Signed');
  const completedContracts = contractData.filter((contract) => contract.status === 'Completed');
  const expiredContracts = contractData.filter((contract) => contract.status === 'Expired');

  const { mutate: updateContractStatus } = useMutation(['updateContractStatus'], (variables) => updateContractStatus(variables), {
    onSuccess: () => {
      refetch();
    }
  });
  const { mutate: deleteContract } = useMutation(['deleteContract'], (variables) => deleteContract(variables), {
    onSuccess: () => {
      refetch();
    }
  });

  const handleDelete = (contractId) => {
    const variables = { contractId };
    return mutate({ variables });
  };

  const handleMarkAsCompleted = (contractId) => {
    const variables = { contractId, status: 'Completed' };
    return mutate({ variables });
  };

  const handleMarkAsSigned = (contractId) => {
    const variables = { contractId, status: 'Signed' };
    return mutate({ variables });
  };

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const mainTabStyle = {
    minHeight: 200,
    width: '100%'
  };

  const tabStyle = {
    flexBasis: isMobile ? '100%' : '25%',
    textAlign: 'center',
    transition: 'all 0.3s ease'
  };

  const tabListStyle = {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap'
  };

  if (isMobile) {
    mainTabStyle.minHeight = 300;
    mainTabStyle.display = 'flex';
    mainTabStyle.flexDirection = 'column';
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Contract Name',
        accessor: 'name'
      },
      {
        Header: 'Gig',
        accessor: 'gig'
      },
      {
        Header: 'File',
        accessor: 'fileUrl',
        Cell: ({ row }) => {
          return (
            <a href={row.original.fileUrl} target="_blank" rel="noopener noreferrer">
              Download File
            </a>
          );
        }
      },
      {
        Header: 'Start Date',
        accessor: 'start',
        Cell: ({ value }) => {
          return formatDate(value);
        }
      },
      {
        Header: 'End Date',
        accessor: 'expiration',
        Cell: ({ value }) => {
          return formatDate(value);
        }
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ row }) => {
          const status = row.original.status;
          switch (status) {
            case 'Pending':
              return <span className="text-yellow">Pending</span>;
            case 'Signed':
              return <span className="text-green">Signed</span>;
          }
        }
      },

      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => {
          return (
            <>
              <Button className="blue-btn" mt="md" radius="md" fullWidth onClick={() => handleMarkAsCompleted(row.original.contractId)}>
                Mark as Completed
              </Button>
              <Button className="blue-btn" mt="md" radius="md" fullWidth onClick={() => handleMarkAsSigned(row.original.contractId)}>
                Mark as Signed
              </Button>
              <Button className="red-btn" mt="md" radius="md" fullWidth onClick={() => handleDelete(row.original.contractId)}>
                Delete
              </Button>
            </>
          );
        }
      }
    ],
    []
  );

  const columnsXP = useMemo(
    () => [
      {
        Header: 'Contract Name',
        accessor: 'name'
      },
      {
        Header: 'Gig',
        accessor: 'gig'
      },
      {
        Header: 'File',
        accessor: 'file',
        Cell: ({ row }) => {
          return (
            <a href={row.original.fileUrl} target="_blank" rel="noopener noreferrer">
              Download File
            </a>
          );
        }
      },
      {
        Header: 'Start Date',
        accessor: 'start',
        Cell: ({ value }) => {
          return formatDate(value);
        }
      },
      {
        Header: 'End Date',
        accessor: 'expiration',
        Cell: ({ value }) => {
          return formatDate(value);
        }
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ row }) => {
          const status = row.original.status;
          switch (status) {
            case 'Completed':
              return <span className="text-green">Completed</span>;
            case 'Expired':
              return <span className="text-red">Expired</span>;
          }
        }
      },

      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => {
          return (
            <>
              <Button
                className="blue-btn"
                mt="md"
                radius="md"
                fullWidth
                onClick={() => {
                  handleMarkAsCompleted(row.original.contractId);
                }}
              >
                Mark as Completed
              </Button>
            </>
          );
        }
      }
    ],
    []
  );

  return (
    <MainCard mt={20}>
      <ScrollX>
        <Tabs color="teal" onTabChange={handleTabChange} value={activeTab} style={mainTabStyle}>
          <Tabs.List style={tabListStyle}>
            <Tabs.Tab value="Pending" style={tabStyle}>
              Pending
            </Tabs.Tab>
            <Tabs.Tab value="Signed" style={tabStyle}>
              Signed
            </Tabs.Tab>
            <Tabs.Tab value="Achived" style={tabStyle}>
              Achived
            </Tabs.Tab>
            <Tabs.Tab value="Expired" style={tabStyle}>
              Expired
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="Pending" pt="xs">
            <ReactTable columns={columns} data={pendingContracts} striped={striped} />
          </Tabs.Panel>
          <Tabs.Panel value="Signed" pt="xs">
            <ReactTable columns={columns} data={signedContracts} striped={striped} />
          </Tabs.Panel>
          <Tabs.Panel value="Achived" pt="xs">
            <ReactTable columns={columnsXP} data={completedContracts} striped={striped} />
          </Tabs.Panel>
          <Tabs.Panel value="Expired" pt="xs">
            <ReactTable columns={columnsXP} data={expiredContracts} striped={striped} />
          </Tabs.Panel>
        </Tabs>
      </ScrollX>
    </MainCard>
  );
};

ContractTabs.propTypes = {
  contractData: PropTypes.array,
  striped: PropTypes.any,
  refetch: PropTypes.func,
  row: PropTypes.any
};

export default ContractTabs;
