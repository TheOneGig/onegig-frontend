import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Grid, Button, Modal, useMantineTheme, TextInput, Title, Box, Flex, NumberInput, Select, FileInput } from '@mantine/core';
import { useForm, hasLength, isInRange } from '@mantine/form';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import {
  createContract,
  updateContract,
  deleteContract,
  uploadContractFile,
  updateContractSigned,
  getAllContracts
} from 'hooks/useContracts';
import useAuth from 'hooks/useAuth';
import ReactTable from './table';

const ContractsTable = ({ striped, title }) => {
  const theme = useMantineTheme();
  const { user } = useAuth();
  const userId = user.id;
  const [contract, setContract] = useState();
  const [gigs, setGigs] = useState(["Project1", "Project2", "Project3"]);
  // const [gigId , setGigId] = useState("")
  const [openedDelete, setOpenedDelete] = useState(false);
  const [openedEdit, setOpenedEdit] = useState(false);
  const [openedNew, setOpenedNew] = useState(false);
  const [file, setFile] = useState(null);
  const { data: allContracts, isLoading: loadingContracts, refetch } = useQuery(['allContracts'], () => getAllContracts({ userId }));


  const { mutate: contractDelete, isLoading: loadingDelete } = useMutation(deleteContract, {
    onSuccess: () => {
      refetch();
      setOpenedDelete(false);
    },
  });

  const { mutate: contractEdit, isLoading: loadingEdit } = useMutation(updateContract, {
    onSuccess: () => {
      refetch();
      setOpenedEdit(false);
    },
  });

  const { mutate: contractNew, isLoading: loadingNew } = useMutation(createContract, {
    onSuccess: () => {
      refetch();
      setOpenedNew(false);
    },
  });

  // const { mutate: contractSign, isLoading: loadingSign } = useMutation(signContract, {
  //   onSuccess: () => {
  //     refetch();
  //   },
  // });

  const handleDelete = async (contractId) => {
    const variables = { contractId };
    await deleteContract({ variables });
  }

  async function handleNew(values) {
    const fileUrl = values.file ? await uploadContractFile(values.file) : null;
  
    const variables = {
      userId,
      contractName: values.contractName,
      description: values.description,
      file: fileUrl,
      gig: values.gig,
    };
    return contractNew({ variables });
  }
  
  async function handleEdit(values) {
    const fileUrl = values.file ? await uploadContractFile(values.file) : contract.fileUrl;
  
    const variables = {
      contractId: contract.contractId,
      contractName: values.contractName,
      description: values.description,
      file: fileUrl,
      gig: values.gig,
    };
    return contractEdit({ variables });
  }

  const handleSign = async (contractId) => {
    const variables = { contractId };
  
    // Utiliza updateContractSigned de tus hooks en lugar de contractSign
    await updateContractSigned({ variables });
  };
  
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };
  
  const fileInputProps = {
    value: file,
    onChange: handleFileInputChange,
  };

  const form = useForm({
    initialValues: {
      contractName: '',
      file: null,
      description: '',
      gig: '',
    },

    validate: {
      contractName: hasLength({ min: 1, max: 100 }, 'Contract Name must be 1-100 characters long'),
      description: hasLength({ min: 5, max: 600 }, 'Description must be 5-600 characters long')
    }
  });

  useEffect(() => {
    form.reset({
      contractName: '',
      file: null,
      description: '',
    });
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Contract Name',
        accessor: 'contractName',
      },
      {
        Header: 'File',
        accessor: 'file',
        Cell: ({ row }) => {
          return <a href={row.original.fileUrl} target="_blank" rel="noopener noreferrer">Download File</a>;
        },
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ row }) => {
          return row.original.status ? (
            <span className="text-green">Completed</span>
          ) : (
            <span className="text-red">Pending</span>
          );
        },
      },
      {
        Header: 'Gig',
        accessor: 'gig',
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => {
          return (
            <Grid>
              <Grid.Col span={4}>
                <Button
                  className="blue-btn"
                  mt="md"
                  radius="md"
                  fullWidth
                  onClick={() => {
                    setContract(row.original);
                    setOpenedEdit(true);
                  }}
                >
                  Edit
                </Button>
              </Grid.Col>
              <Grid.Col span={4}>
                <Button
                  className="red-btn"
                  mt="md"
                  radius="md"
                  fullWidth
                  onClick={() => {
                    setContract(row.original);
                    setOpenedDelete(true);
                  }}
                >
                  Delete
                </Button>
              </Grid.Col>
            </Grid>
          );
        },
      },
    ],
    []
  );

// if (loadingContracts) {
//   return <div>Loading Contracts...</div>;
// }
  return (
    <>
      <Flex mih={100} gap="md" justify="flex-start" align="flex-start" direction="row" wrap="wrap">
        <Button
          onClick={() => {
            setContract();
            setOpenedNew(true);
          }}
          className="create-btn blue-btn"
          variant="light"
        >
          New Contract
        </Button>
      </Flex>

      <MainCard content={false} title={title}>
        <ScrollX>
          <ReactTable columns={columns} data={allContracts} striped={striped} />
        </ScrollX>

        <Modal
          opened={openedEdit}
          onClose={() => setOpenedEdit(false)}
          title="Edit Contract"
          overlayColor={theme.colors.dark[9]}
          overlayOpacity={0.55}
          overlayBlur={3}
          centered
        >
          <div>
            <Box component="form" maw={400} mx="auto" onSubmit={form.onSubmit((values) => handleEdit(values))}>
              <Grid>
                <Grid.Col span={12}>
                  <Title order={1}>Edit Contract</Title>

                  <TextInput label="Contract Name" placeholder="Contract name" withAsterisk {...form.getInputProps('contractName')} />
                  <TextInput label="Description" placeholder="Short description" withAsterisk {...form.getInputProps('description')} />
                  <FileInput label="File" accept=".pdf,.doc,.docx" {...fileInputProps} />
                  <Select
                    label="Gig"
                    placeholder="Select a gig"
                    data={gigs.map((gig) => {
                      return { value: gig.id, label: gig.name };
                    })}
                    //value={gigId}
                    // onChange={setGigId}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <Button
                    variant="light"
                    color="default"
                    mt="md"
                    radius="md"
                    fullWidth
                    onClick={() => setOpenedEdit(false)}
                    loading={loadingEdit}
                  >
                    Cancel
                  </Button>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Button variant="light" color="green" mt="md" radius="md" fullWidth type="submit" loading={loadingEdit}>
                    Save
                  </Button>
                </Grid.Col>
              </Grid>
            </Box>
          </div>
        </Modal>

        <Modal
          opened={openedNew}
          onClose={() => setOpenedNew(false)}
          title="Add Contract"
          overlayColor={theme.colors.dark[9]}
          overlayOpacity={0.55}
          overlayBlur={3}
          centered
        >
          <div>
            <Box component="form" maw={400} mx="auto" onSubmit={form.onSubmit((values) => handleNew(values))}>
              <Grid>
                <Grid.Col span={12}>
                  <Title order={1}>New Contract</Title>
                  <TextInput label="Contract Name" placeholder="Contract name" withAsterisk {...form.getInputProps('contractName')} />
                  <TextInput label="Description" placeholder="Short description" withAsterisk {...form.getInputProps('description')} />
                  <FileInput label="File" accept=".pdf,.doc,.docx" {...form.getInputProps('file')} />
                  <Select
                     label="Gig"
                     placeholder="Select a gig"
                     data={
                        gigs.map((gig) => {
                          return { value: gig.id, label: gig.name };
                        }
                        )
                     }
                    //  value={gigId}
                    //  onChange={setGigId}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <Button
                    variant="light"
                    color="default"
                    mt="md"
                    radius="md"
                    fullWidth
                    onClick={() => setOpenedNew(false)}
                    loading={loadingNew}
                  >
                    Cancel
                  </Button>
                </Grid.Col>
                <Grid.Col span={6}>
          <Button variant="light" color="green" mt="md" radius="md" fullWidth type="submit" loading={loadingNew}>
            Save
          </Button>
        </Grid.Col>
        </Grid>
        </Box>
        </div>
        </Modal>

        <Modal
          opened={openedDelete}
          onClose={() => setOpenedDelete(false)}
          title="Delete Contract?"
          overlayColor={theme.colors.dark[9]}
          overlayOpacity={0.55}
          overlayBlur={3}
          centered
        >
          <div>
            <p>Are you sure you want to delete this Contract? This is irreversible!</p>
            <Grid>
              <Grid.Col span={6}>
                <Button
                  variant="light"
                  color="default"
                  mt="md"
                  radius="md"
                  fullWidth
                  onClick={() => setOpenedDelete(false)}
                  loading={loadingDelete}
                >
                  Cancel
                </Button>
              </Grid.Col>
              <Grid.Col span={6}>
                <Button
                  variant="light"
                  color="red"
                  mt="md"
                  radius="md"
                  fullWidth
                  onClick={() => handleDelete(contract.contractId)}
                  loading={loadingDelete}
                >
                  Yes, I am sure!
                </Button>
              </Grid.Col>
            </Grid>
          </div>
        </Modal>
        </MainCard>
  </>
  );
};

ContractsTable.propTypes = {
  data: PropTypes.array,
  striped: PropTypes.bool,
  title: PropTypes.string,
  rowData: PropTypes.object,
};
export default ContractsTable;
