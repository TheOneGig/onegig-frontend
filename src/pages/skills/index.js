import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';

// material-ui
import { Grid, Button, Modal, useMantineTheme } from '@mantine/core';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { deleteSkill, getAllSkills } from 'hooks/skills';
import ReactTable from './table';

// ==============================|| REACT TABLE - BASIC ||============================== //

const SkillsTable = ({ striped, title }) => {
  const theme = useMantineTheme();
  const [skill, setSkill] = useState();
  const [openedDelete, setOpenedDelete] = useState(false);
  const { data: allSkills, isLoading: loadingSkills, refetch } = useQuery(['allSkills'], () => getAllSkills());
  const { mutate: skillDelete, isLoading: loadingDelete } = useMutation(['deleteSkill'], (variables) => deleteSkill(variables), {
    onSuccess: () => {
      refetch();
      setOpenedDelete(false);
    }
  });

  function handleDelete(skillId) {
    const variables = { skillId };
    return skillDelete({ variables });
  }

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
                <Button variant="light" color="blue" mt="md" radius="md" fullWidth onClick={() => handleEdit(row.original)}>
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
    <MainCard content={false} title={title}>
      <ScrollX>
        <ReactTable columns={columns} data={allSkills} striped={striped} />
      </ScrollX>

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
  );
};

SkillsTable.propTypes = {
  data: PropTypes.any,
  striped: PropTypes.bool,
  title: PropTypes.string,
  row: PropTypes.object
};

export default SkillsTable;
