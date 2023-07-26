import React, { useState, useEffect, useMemo } from 'react';
import { Tabs, Button, Modal, Text } from '@mantine/core';
import ReactTable from './table';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { deleteClient } from 'hooks/clients';
import { showNotification } from '@mantine/notifications';
import { useTheme } from '@mui/material/styles';
import { IconCheck } from '@tabler/icons-react';
import { useMutation } from 'react-query';
import ClientEdit from './drawerEdit';
import PropTypes from 'prop-types';

const CMRTabs = ({ clientData, striped, refetch, userId }) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('Active');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const pendingClients = clientData.filter((client) => client.status === 'Pending');
  const activeClients = clientData.filter((client) => client.status === 'Active');
  const leadClients = clientData.filter((client) => client.status === 'Lead');
  const completedClients = clientData.filter((client) => client.status === 'Completed');
  const [deleteSelected, setDeleteSelected] = useState(false);
  const [openedEdit, setOpenedEdit] = useState(false);
  const [openedActions, setOpenedActions] = useState(false);
  const [client, setClient] = useState(null);

  const { mutate: mutateDeleteClient } = useMutation(['deleteClient'], (variables) => deleteClient(variables), {
    onSuccess: () => {
      refetch();
      showNotification({
        id: 'load-data',
        color: 'red',
        title: 'Client Deleted!',
        message: 'Client deleted succesfully, you can close this notification',
        icon: <IconCheck size="1rem" />,
        autoClose: 3000
      });
    }
  });

  const handleDelete = () => {
    const clientId = client.clientId;
    const variables = { clientId };
    return mutateDeleteClient({ variables });
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

  const handleModalClose = () => {
    setOpenedActions(false);
  };

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
        Header: 'Last Name',
        accessor: 'lastName'
      },
      {
        Header: 'First Name',
        accessor: 'firstName'
      },
      {
        Header: 'City',
        accessor: 'city'
      },
      {
        Header: 'Phone Number',
        accessor: 'phoneNumber',
        Cell: ({ row }) => {
          return <a href={`tel:${row.original.phoneNumber}`}>{row.original.phoneNumber}</a>;
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
                  setClient(row.original);
                  setOpenedActions(true);
                }}
              >
                Actions
              </Button>
            </>
          );
        }
      }
    ],
    []
  );
  return (
    <>
      <MainCard>
        <ScrollX>
          <Tabs color="teal" onTabChange={handleTabChange} value={activeTab} style={mainTabStyle}>
            <Tabs.List style={tabListStyle}>
              <Tabs.Tab value="Active" style={tabStyle}>
                Active
              </Tabs.Tab>
              <Tabs.Tab value="Pending" style={tabStyle}>
                Pending
              </Tabs.Tab>
              <Tabs.Tab value="Lead" style={tabStyle}>
                Leads
              </Tabs.Tab>
              <Tabs.Tab value="Completed" style={tabStyle}>
                Completed
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="Active" pt="xs">
              <ReactTable columns={columns} data={activeClients} striped={striped} />
            </Tabs.Panel>
            <Tabs.Panel value="Pending" pt="xs">
              <ReactTable columns={columns} data={pendingClients} striped={striped} />
            </Tabs.Panel>
            <Tabs.Panel value="Lead" pt="xs">
              <ReactTable columns={columns} data={leadClients} striped={striped} />
            </Tabs.Panel>
            <Tabs.Panel value="Completed" pt="xs">
              <ReactTable columns={columns} data={completedClients} striped={striped} />
            </Tabs.Panel>
          </Tabs>
        </ScrollX>
      </MainCard>
      <ClientEdit opened={openedEdit} refetch={refetch} setOpened={setOpenedEdit} userId={userId} client={client} />
      <Modal
        opened={openedActions}
        onClose={handleModalClose}
        title={deleteSelected ? 'Delete Client?' : 'Actions'}
        overlayColor={theme.colors.dark[9]}
        overlayOpacity={0.55}
        overlayBlur={3}
        centered
      >
        {deleteSelected ? (
          <>
            <Button
              fullWidth
              mt={20}
              variant="light"
              color="red"
              onClick={() => {
                handleDelete();
                handleModalClose();
              }}
            >
              Yes
            </Button>
            <Button
              fullWidth
              mt={20}
              variant="light"
              onClick={() => {
                setDeleteSelected(false);
              }}
            >
              No
            </Button>
            <Text style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              WARNING: If you select Yes your client will be deleted permanently.
            </Text>
          </>
        ) : (
          <>
            <Button
              fullWidth
              mt={20}
              variant="light"
              onClick={() => {
                setOpenedEdit(true);
                handleModalClose();
              }}
            >
              Edit
            </Button>
            <Button
              fullWidth
              mt={20}
              variant="light"
              color="red"
              onClick={() => {
                setDeleteSelected(true);
              }}
            >
              Delete
            </Button>
          </>
        )}
      </Modal>
    </>
  );
};

CMRTabs.propTypes = {
  clientData: PropTypes.array.isRequired,
  striped: PropTypes.bool,
  refetch: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  showNotification: PropTypes.func.isRequired,
  updateClientStatus: PropTypes.func.isRequired,
  deleteClient: PropTypes.func.isRequired,
  row: PropTypes.object
};

export default CMRTabs;
