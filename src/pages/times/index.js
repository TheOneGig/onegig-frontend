import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';

// material-ui
import { Grid, Button, Modal, useMantineTheme, Box, Flex, NumberInput, Select, Table } from '@mantine/core';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import useAuth from 'hooks/useAuth';
import { addTime, getProjects, getTimes, updateTime } from 'hooks/projects';
import { getWeekDates } from 'utils/getWeekDates';

const TimesTable = () => {
  const theme = useMantineTheme();
  const { user } = useAuth();
  const userId = user.id;
  const [date, setDate] = useState(new Date());
  const [projectId, setProjectId] = useState();
  const [projectRows, setProjectRows] = useState([]);
  const [openedNew, setOpenedNew] = useState(false);
  const { data: allProjects, isLoading: loadingProjects } = useQuery(['allProjects'], () => getProjects({ userId }));
  const { data: allTimes, isLoading: loadingTimes, refetch } = useQuery(['allTimes'], () => getTimes({ userId }));
  const { mutate: timeUpdate, isLoading: loadingEdit } = useMutation(['updateTime'], (variables) => updateTime(variables), {
    onSuccess: () => {
      refetch();
    }
  });

  const { mutate: timeNew, isLoading: loadingNew } = useMutation(['newTime'], (variables) => addTime(variables), {
    onSuccess: () => {
      refetch();
    }
  });

  function handleEdit({ timeId, date, hours }) {
    const variables = {
      timeId,
      date,
      hours
    };
    return timeUpdate({ variables });
  }

  function handleNew(values) {
    const variables = { userId, projectId };
    return timeNew({ variables });
  }

  function handleNewProjectRow(e) {
    e.preventDefault();
    console.log(projectId);
    setProjectRows([...projectRows, projectId]);
    setOpenedNew(false);
  }

  if (loadingTimes || loadingProjects) {
    return <div>Loading Times...</div>;
  }

  console.log(allTimes);

  const projectOptions = [];
  allProjects.forEach((project) => {
    if (project.payments?.length > 0) {
      if (project.status !== 'ARCHIVED' && project.status !== 'LEAD') {
        projectOptions.push({ value: project.projectId, label: project.name });
      }
    } else {
      projectOptions.push({ value: project.projectId, label: project.name });
    }
  });

  const rows = projectRows.map((projectId) => {
    const project = allProjects.find((project) => project.projectId === projectId);
    return (
      <tr key={projectId}>
        <td>{project.name}</td>
        {getWeekDates(date).map((date) => {
          return (
            <td key={date}>
              <NumberInput />
            </td>
          );
        })}
      </tr>
    );
  });

  function changeWeek(weeks) {
    setDate(new Date(date.setDate(date.getDate() + 7 * weeks)));
  }

  return (
    <>
      <Flex mih={50} gap="md" justify="flex-start" align="flex-start" direction="row" wrap="wrap">
        <Button onClick={() => setOpenedNew(true)} className="create-btn blue-btn" variant="light">
          New Project Row
        </Button>
      </Flex>
      <Box sx={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Button variant="outline" color="cyan" onClick={() => changeWeek(-1)}>
            <span>{'<'}</span>
          </Button>
          <Button variant="outline" color="cyan" onClick={() => changeWeek(1)}>
            <span>{'>'}</span>
          </Button>
        </Box>
        <Button variant="outline" color="cyan" onClick={() => setDate(new Date())}>
          <span>Today</span>
        </Button>
      </Box>
      <MainCard content={false}>
        <ScrollX>
          <Table>
            <thead>
              <tr>
                <th width={'30%'}>Project</th>
                {getWeekDates(date).map((date) => (
                  <th width={'10%'} key={date}>
                    {date}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollX>
      </MainCard>
      <Box sx={{ marginBottom: '10px', display: 'flex', justifyContent: 'end' }}>
        <Button variant="outline" color="cyan" onClick={() => setDate(new Date())}>
          <span>Save</span>
        </Button>
      </Box>
      <Modal
        opened={openedNew}
        onClose={() => setOpenedNew(false)}
        title="New Project Row"
        overlayColor={theme.colors.dark[9]}
        overlayOpacity={0.55}
        overlayBlur={3}
        centered
      >
        <div>
          <Box component="form" mx="auto">
            <Grid>
              <Grid.Col span={12}>
                <Select label="Project" placeholder="Select Project" data={projectOptions} value={projectId} onChange={setProjectId} />
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
                <Button variant="light" color="green" mt="md" radius="md" fullWidth type="submit" onClick={(e) => handleNewProjectRow(e)}>
                  Add
                </Button>
              </Grid.Col>
            </Grid>
          </Box>
        </div>
      </Modal>
    </>
  );
};

TimesTable.propTypes = {
  data: PropTypes.any,
  striped: PropTypes.bool,
  title: PropTypes.string,
  row: PropTypes.object
};

export default TimesTable;
