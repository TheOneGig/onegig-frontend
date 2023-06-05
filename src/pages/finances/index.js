import PropTypes from 'prop-types';
import { useMemo, useState, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';

// material-ui
import { Grid, Button, Modal, useMantineTheme, TextInput, Title, Box, Flex, NumberInput, Select } from '@mantine/core';
import { useForm, hasLength, isInRange } from '@mantine/form';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { createTransaction, deleteTransaction, getAllTransactions, updateTransaction } from 'hooks/transactions';
import useAuth from 'hooks/useAuth';
import { formatUSD } from 'utils/formatUSD';
import ReactTable from './table';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

const TransactionsTable = ({ striped, title }) => {
  const theme = useMantineTheme();
  const { user } = useAuth();
  const userId = user.id;
  const [transaction, setTransaction] = useState();
  const [transactionType, setTransactionType] = useState('REVENUE');
  const [date, setDate] = useState(new Date());
  const [openedDelete, setOpenedDelete] = useState(false);
  const [openedEdit, setOpenedEdit] = useState(false);
  const [openedNew, setOpenedNew] = useState(false);
  const {
    data: allTransactions,
    isLoading: loadingTransactions,
    refetch
  } = useQuery(['allTransactions'], () => getAllTransactions({ userId }));

  const { mutate: transactionDelete, isLoading: loadingDelete } = useMutation(
    ['deleteTransaction'],
    (variables) => deleteTransaction(variables),
    {
      onSuccess: () => {
        refetch();
        setOpenedDelete(false);
        showNotification({
          id: 'load-data',
          color: 'red',
          title: 'Transaction Deleted!',
          message: 'Your transaction was saved succesfully, you can close this notification',
          icon: <IconCheck size="1rem" />,
          autoClose: 3000
        });
      }
    }
  );

  const { mutate: transactionEdit, isLoading: loadingEdit } = useMutation(
    ['updateTransaction'],
    (variables) => updateTransaction(variables),
    {
      onSuccess: () => {
        refetch();
        setOpenedEdit(false);
        showNotification({
          id: 'load-data',
          color: 'blue',
          title: 'Transaction Updated!',
          message: 'Your transaction was updated succesfully, you can close this notification',
          icon: <IconCheck size="1rem" />,
          autoClose: 3000
        });
        form.reset();
      }
    }
  );

  const { mutate: transactionNew, isLoading: loadingNew } = useMutation(
    ['createTransaction'],
    (variables) => createTransaction(variables),
    {
      onSuccess: () => {
        refetch();
        setOpenedNew(false);
        showNotification({
          id: 'load-data',
          color: 'teal',
          title: 'Transaction Saved!',
          message: 'Congratulations! your transaction was saved succesfully, you can close this notification',
          icon: <IconCheck size="1rem" />,
          autoClose: 3000
        });
        form.reset();
      }
    }
  );

  function handleDelete(transactionId) {
    const variables = { transactionId };
    return transactionDelete({ variables });
  }

  function handleEdit(values) {
    const variables = {
      transactionId: transaction.transactionId,
      amount: values.amount * 100,
      description: values.description,
      type: transactionType,
      date
    };
    return transactionEdit({ variables });
  }

  function handleNew(values) {
    const variables = { userId, amount: values.amount * 100, description: values.description, date, type: transactionType };
    return transactionNew({ variables });
  }

  const form = useForm({
    initialValues: {
      amount: 0,
      description: ''
    },

    validate: {
      amount: isInRange({ min: 1 }, 'Amount  minimum is $1'),
      description: hasLength({ min: 5, max: 600 }, 'Name must be 5-600 characters long')
    }
  });

  useEffect(() => {
    if (transaction) {
      form.setValues({
        amount: transaction.amount / 100,
        description: transaction.description
      });
      setTransactionType(transaction.type);
      setDate(new Date(transaction.date));
    } else {
      form.setValues({
        amount: 0,
        description: ''
      });
      setTransactionType('REVENUE');
      setDate(new Date());
    }
  }, [transaction, form]);

  const columns = useMemo(
    () => [
      {
        Header: 'Transaction Date',
        accessor: 'date',
        Cell: ({ value }) => {
          return dayjs(value).format('MMMM DD');
        }
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        Cell: ({ row }) => {
          if (row.original.type === 'REVENUE') {
            return <span className="text-green">{formatUSD(row.original.amount)}</span>;
          } else {
            return <span className="text-red">({formatUSD(row.original.amount)})</span>;
          }
        }
      },
      {
        Header: 'Description',
        accessor: 'description'
      },
      {
        Header: 'Actions',
        accessor: 'transactionId',
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
                    setTransaction(row.original);
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
                    setTransaction(row.original);
                    setOpenedDelete(true);
                  }}
                >
                  Delete
                </Button>
              </Grid.Col>
            </Grid>
          );
        }
      }
    ],
    []
  );

  if (loadingTransactions) {
    return <div>Loading Transactions...</div>;
  }

  return (
    <>
      <Flex mih={50} gap="md" justify="flex-start" align="flex-start" direction="row" wrap="wrap">
        <Button
          onClick={() => {
            setTransaction();
            setOpenedNew(true);
          }}
          className="create-btn blue-btn"
          variant="light"
        >
          New Transaction
        </Button>
      </Flex>
      <MainCard content={false} title={title}>
        <ScrollX>
          <ReactTable columns={columns} data={allTransactions} striped={striped} />
        </ScrollX>

        <Modal
          opened={openedEdit}
          onClose={() => setOpenedEdit(false)}
          title="Transactions"
          overlayColor={theme.colors.dark[9]}
          overlayOpacity={0.55}
          overlayBlur={3}
          centered
        >
          <div>
            <Box component="form" maw={400} mx="auto" onSubmit={form.onSubmit((values) => handleEdit(values))}>
              <Grid>
                <Grid.Col span={12}>
                  <Title mb={5} order={1}>
                    Edit Transaction
                  </Title>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDateTimePicker defaultValue={dayjs(date)} onChange={(value) => setDate(value)} />
                  </LocalizationProvider>
                  <TextInput label="Description" placeholder="Short description" withAsterisk {...form.getInputProps('description')} />
                  <NumberInput
                    label="Amount"
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    formatter={(value) => (!Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '$ ')}
                    {...form.getInputProps('amount')}
                  />
                  <Select
                    label="Type"
                    placeholder="Transaction type"
                    data={
                      transactionType == 'REVENUE'
                        ? [
                            { value: 'REVENUE', label: 'Revenue' },
                            { value: 'EXPENSE', label: 'Expense' }
                          ]
                        : [
                            { value: 'EXPENSE', label: 'Expense' },
                            { value: 'REVENUE', label: 'Revenue' }
                          ]
                    }
                    value={transactionType}
                    onChange={setTransactionType}
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
          title="Transactions"
          overlayColor={theme.colors.dark[9]}
          overlayOpacity={0.55}
          overlayBlur={3}
          centered
        >
          <div>
            <Box component="form" maw={400} mx="auto" onSubmit={form.onSubmit((values) => handleNew(values))}>
              <Grid>
                <Grid.Col span={12}>
                  <Title mb={5} order={1}>
                    New Transaction
                  </Title>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDateTimePicker defaultValue={dayjs()} onChange={(value) => setDate(value)} />
                  </LocalizationProvider>
                  <TextInput label="Description" placeholder="Short description" withAsterisk {...form.getInputProps('description')} />
                  <NumberInput
                    label="Amount"
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    formatter={(value) => (!Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '$ ')}
                    {...form.getInputProps('amount')}
                  />
                  <Select
                    label="Type"
                    placeholder="Transaction type"
                    data={[
                      { value: 'REVENUE', label: 'Revenue' },
                      { value: 'EXPENSE', label: 'Expense' }
                    ]}
                    value={transactionType}
                    onChange={setTransactionType}
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
          title="Delete Transaction?"
          overlayColor={theme.colors.dark[9]}
          overlayOpacity={0.55}
          overlayBlur={3}
          centered
        >
          <div>
            <p>Are you sure you want to delete this Transaction? This is irreversible!</p>
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
                  onClick={() => handleDelete(transaction.transactionId)}
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

TransactionsTable.propTypes = {
  data: PropTypes.any,
  striped: PropTypes.bool,
  title: PropTypes.string,
  row: PropTypes.object
};

export default TransactionsTable;
