import React, {useState, useEffect, useMemo,} from 'react';
import { Tabs, Button } from '@mantine/core';
import ReactTable from './table';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { deleteContract, updateContractStatus } from 'hooks/contracts';
import { useMutation } from 'react-query'

const ContractTabs = ({ contractData, striped, refetch }) => {
  const [activeTab, setActiveTab] = useState("Pending");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const pendingContracts =  contractData.filter(contract => contract.status === 'Pending');
  const signedContracts = contractData.filter(contract => contract.status === 'Signed');
  const completedContracts = contractData.filter(contract => contract.status === 'Completed');

  const { mutate: mutateUpdateContractStatus, isLoading: loadingUpdate} = useMutation(
    ['updateContractStatus'],
    (variables) => updateContractStatus(variables),
    {
      onSuccess: () => {
        refetch();
      }
    } 
  );
  const { mutate: mutateDeleteContract, isLoading: loadingDelete } = useMutation(
    ['deleteContract'],
    (variables) => deleteContract(variables),
    {
      onSuccess: () => {
        refetch();
      }
    }
  );
  
  const handleDelete = (contractId) => {
    const variables = { contractId };
    return mutateDeleteContract({ variables });
  }

  const handleMarkAsCompleted = (contractId) => {
    const variables = { contractId, status: 'Completed' };
    return mutateUpdateContractStatus({variables})
  };

  const handleMarkAsSigned = (contractId) => {
    const variables = { contractId, status: 'Signed' };
    return mutateUpdateContractStatus({variables})
  };

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const mainTabStyle = {
    minHeight: 200,
    width: '100%',

  }

  const tabStyle = {
    flexBasis: isMobile ? '100%' : '33%',
    textAlign: 'center',
    transition: 'all 0.3s ease',
  };
  
  const tabListStyle = {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  };

  if (isMobile) {
    mainTabStyle.minHeight = 300;
    mainTabStyle.display = "flex"
    mainTabStyle.flexDirection = "column"
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
        accessor: 'name',
      },
      {
        Header: 'Gig',
        accessor: 'gig',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'File',
        accessor: 'fileUrl',
        Cell: ({ row }) => {
          return <a href={row.original.fileUrl} target="_blank" rel="noopener noreferrer">Download File</a>;
        },
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
            case 'Completed':
              return <span className="text-green">Completed</span>;
          }
        }
      },
    
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => {
          const status = row.original.status;
          switch (status) {
            case 'Pending':
              return (
                <>
                 <Button 
                   className="blue-btn"
                   mt="md"
                   radius="md"
                   fullWidth
                   onClick={() => handleMarkAsSigned(row.original.contractId)}>
                   Mark as Signed
                 </Button>
                 <Button 
                   className="red-btn"
                   mt="md"
                   radius="md"
                   fullWidth
                   onClick={() => handleDelete(row.original.contractId)}>
                   Delete
                 </Button>
               </>
           );
            case 'Signed':
              return (
                <>
                 <Button 
                   className="blue-btn"
                   mt="md"
                   radius="md"
                   fullWidth                
                   onClick={() => handleMarkAsCompleted(row.original.contractId)}>
                   Mark as Completed
                 </Button>
               </>
           );
            case 'Completed':
              return (
                <>
                  <Button 
                    className="blue-btn"
                    mt="md"
                    radius="md"
                    fullWidth                
                    onClick={() => handleMarkAsSigned(row.original.contractId)}>
                    Reopen Contract
                  </Button>
               </>
            );
          }

        },
      },
    ],
    []
  );
  return (
    <MainCard >
        <ScrollX>
      <Tabs color="teal" onTabChange={handleTabChange} value={activeTab} style={mainTabStyle}>
        <Tabs.List style={tabListStyle}>
          <Tabs.Tab value="Pending" style={tabStyle}>
            Pending
          </Tabs.Tab>
          <Tabs.Tab value="Signed" style={tabStyle}>
            Signed
          </Tabs.Tab>
          <Tabs.Tab value="Completed" style={tabStyle}>
            Completed
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="Pending" pt="xs">
          <ReactTable columns={columns} data={pendingContracts} striped={striped} />
        </Tabs.Panel>
        <Tabs.Panel value="Signed" pt="xs">
          <ReactTable columns={columns} data={signedContracts} striped={striped} />
        </Tabs.Panel>
        <Tabs.Panel value="Completed" pt="xs">
          <ReactTable columns={columns} data={completedContracts} striped={striped} />
        </Tabs.Panel>
      </Tabs>
        </ScrollX>
    </MainCard>
  );
};



export default ContractTabs;
