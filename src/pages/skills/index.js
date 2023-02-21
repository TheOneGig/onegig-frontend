import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';

// material-ui
import { Grid, Button, Modal, useMantineTheme } from '@mantine/core';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { getAllSkills } from 'hooks/skills';
import ReactTable from './table';

// ==============================|| REACT TABLE - BASIC ||============================== //

const SkillsTable = ({ striped, title }) => {
  const theme = useMantineTheme();
  const [openedDelete, setOpenedDelete] = useState(false);
  const { data: allSkills, isLoading: loadingSkills } = useQuery(['allSkills'], () => getAllSkills());
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
                <Button variant="light" color="red" mt="md" radius="md" fullWidth onClick={() => setOpenedDelete(true)}>
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
        title="Delete"
        overlayColor={theme.colors.dark[9]}
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        {/* Modal content */}
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
