import PropTypes from 'prop-types';
import { useMemo, useState, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';

// material-ui
import { Grid, Button, Modal, useMantineTheme, TextInput, Title, Box, Flex } from '@mantine/core';
import { useForm, hasLength } from '@mantine/form';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { createSkill, deleteSkill, getAllSkills, updateSkill } from 'hooks/skills';
import ReactTable from './table';

// ==============================|| REACT TABLE - BASIC ||============================== //

const SkillsTable = ({ striped, title }) => {
  const theme = useMantineTheme();
  const [skill, setSkill] = useState();
  const [openedDelete, setOpenedDelete] = useState(false);
  const [openedEdit, setOpenedEdit] = useState(false);
  const [openedNew, setOpenedNew] = useState(false);
  const { data: allSkills, isLoading: loadingSkills, refetch } = useQuery(['allSkills'], () => getAllSkills());

  const { mutate: skillDelete, isLoading: loadingDelete } = useMutation(['deleteSkill'], (variables) => deleteSkill(variables), {
    onSuccess: () => {
      refetch();
      setOpenedDelete(false);
    }
  });

  const { mutate: skillEdit, isLoading: loadingEdit } = useMutation(['updateSkill'], (variables) => updateSkill(variables), {
    onSuccess: () => {
      refetch();
      setOpenedEdit(false);
    }
  });

  const { mutate: skillNew, isLoading: loadingNew } = useMutation(['createSkill'], (variables) => createSkill(variables), {
    onSuccess: () => {
      refetch();
      setOpenedNew(false);
    }
  });

  function handleDelete(skillId) {
    const variables = { skillId };
    return skillDelete({ variables });
  }

  function handleEdit(values) {
    const variables = { skillId: skill.skillId, skill: values.name };
    return skillEdit({ variables });
  }

  function handleNew(values) {
    const variables = { skill: values.name };
    return skillNew({ variables });
  }

  const form = useForm({
    initialValues: {
      name: ''
    },

    validate: {
      name: hasLength({ min: 1, max: 40 }, 'Name must be 1-40 characters long')
    }
  });

  useEffect(() => {
    form.setValues({
      name: skill ? skill.skill : ''
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skill]);

  const columns = useMemo(
    () => [
      {
        Header: 'Skill',
        accessor: 'skill'
      },
      {
        Header: 'Actions',
        accessor: 'skillId',
        Cell: ({ row }) => {
          return (
            <Grid>
              <Grid.Col span={4}>
                <Button
                  variant="light"
                  color="blue"
                  mt="md"
                  radius="md"
                  fullWidth
                  onClick={() => {
                    setSkill(row.original);
                    setOpenedEdit(true);
                  }}
                >
                  Edit
                </Button>
              </Grid.Col>
              <Grid.Col span={4}>
                <Button
                  variant="light"
                  color="red"
                  mt="md"
                  radius="md"
                  fullWidth
                  onClick={() => {
                    setSkill(row.original);
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

  if (loadingSkills) {
    return <div>Loading skills...</div>;
  }

  return (
    <>
      <Flex mih={50} gap="md" justify="flex-start" align="flex-start" direction="row" wrap="wrap">
        <Button
          onClick={() => {
            setSkill();
            setOpenedNew(true);
          }}
          className="create-btn"
          variant="light"
        >
          New Skill
        </Button>
      </Flex>
      <MainCard content={false} title={title}>
        <ScrollX>
          <ReactTable columns={columns} data={allSkills} striped={striped} />
        </ScrollX>

        <Modal
          opened={openedEdit}
          onClose={() => setOpenedEdit(false)}
          title="Delete skill?"
          overlayColor={theme.colors.dark[9]}
          overlayOpacity={0.55}
          overlayBlur={3}
        >
          <div>
            <Box component="form" maw={400} mx="auto" onSubmit={form.onSubmit((values) => handleEdit(values))}>
              <Grid>
                <Grid.Col span={12}>
                  <Title order={1}>Edit Skill</Title>

                  <TextInput label="Name" placeholder="Name" withAsterisk {...form.getInputProps('name')} />
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
          title="New skill"
          overlayColor={theme.colors.dark[9]}
          overlayOpacity={0.55}
          overlayBlur={3}
        >
          <div>
            <Box component="form" maw={400} mx="auto" onSubmit={form.onSubmit((values) => handleNew(values))}>
              <Grid>
                <Grid.Col span={12}>
                  <Title order={1}>New Skill</Title>

                  <TextInput label="Name" placeholder="Name" withAsterisk {...form.getInputProps('name')} />
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
          title="Delete skill?"
          overlayColor={theme.colors.dark[9]}
          overlayOpacity={0.55}
          overlayBlur={3}
        >
          <div>
            <p>Are you sure you want to delete this skill? This is irreversible!</p>
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
                  onClick={() => handleDelete(skill.skillId)}
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

SkillsTable.propTypes = {
  data: PropTypes.any,
  striped: PropTypes.bool,
  title: PropTypes.string,
  row: PropTypes.object
};

export default SkillsTable;
