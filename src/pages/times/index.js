import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';

// material-ui
import { Grid, Button, Modal, useMantineTheme, Box, Flex, NumberInput, Select, Table, Tooltip } from '@mantine/core';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import useAuth from 'hooks/useAuth';
import { addTime } from 'hooks/projects';
import { getWeekDates } from 'utils/getWeekDates';
import moment from 'moment';
import axios from 'axios';

const TimesTable = () => {
  const theme = useMantineTheme();
  const { user } = useAuth();
  const userId = user.id;
  const [date, setDate] = useState(new Date());
  const [projectId, setProjectId] = useState();
  const [projectRows, setProjectRows] = useState([]);
  const [openedNew, setOpenedNew] = useState(false);
  const [times, setTimes] = useState({});
  const [allProjects, setAllProjects] = useState([]);
  // const { mutate: timeUpdate } = useMutation(['updateTime'], (variables) => updateTime(variables), {
  //   onSuccess: () => {
  //     // refetch();
  //   }
  // });

  const { mutate: timeNew, isLoading: loadingNew } = useMutation(['newTime'], (variables) => addTime(variables), {
    onSuccess: () => {
      // refetch();
    }
  });

  // function handleEdit({ timeId, date, hours }) {
  //   const variables = {
  //     timeId,
  //     date,
  //     hours
  //   };
  //   return timeUpdate({ variables });
  // }

  function handleNew(projectId, date, hours) {
    const variables = { userId, projectId, date, hours };
    console.log('variables:', variables);
    return timeNew({ variables });
  }

  function saveDates() {
    Object.keys(times).forEach((projectId) => {
      Object.keys(times[projectId]).forEach((date) => {
        const hours = times[projectId][date].hours;
        console.log('hours:', hours);
        handleNew(projectId, new Date(date), hours);
      });
    });
  }

  function handleTime(projectId, date, hours) {
    const time = times[projectId]?.[date]?.hours;
    const currentTimes = { ...times };
    // console.log('currentTimes:', currentTimes);
    if (time) {
      currentTimes[projectId][date].hours = hours;
      setTimes(currentTimes);
    } else {
      currentTimes[projectId] = { ...currentTimes[projectId], [date]: { hours } };
      setTimes(currentTimes);
    }
  }

  function handleNewProjectRow(e) {
    e.preventDefault();
    setProjectRows([...projectRows, projectId]);
    setOpenedNew(false);
  }

  useEffect(() => {
    (async () => {
      const { data: times } = await axios.post('https://one-gig.herokuapp.com/api/projects/userTimes', { userId });
      const { data: projects } = await axios.post('https://one-gig.herokuapp.com/api/projects/user', { userId });
      setAllProjects(projects);
      const projectRows = times.map((time) => time.projectId);
      const uniqueRows = [...new Set(projectRows)];
      setProjectRows(uniqueRows);
      const currentTimes = {};
      times.forEach((time) => {
        const { projectId, date, hours } = time;
        if (currentTimes[projectId]) {
          currentTimes[projectId][date] = { hours };
        } else {
          currentTimes[projectId] = { [date]: { hours } };
        }
        // console.log(currentTimes);
      });
      setTimes(currentTimes);
    })();
  }, [userId]);

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
          const value = times[projectId] && times[projectId][date.toISOString()] ? times[projectId][date.toISOString()].hours : 0;
          return (
            <td key={`${moment(date)}-${projectId}`}>
              <NumberInput value={value} onChange={(e) => handleTime(projectId, date, e)} />
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
      <Tooltip
          label="Create a new project row"
          position="right"
          transition="fade"
          style={{
            backgroundColor:'#484848',
            borderRadius: 6,
            padding: '12px 16px',
            color: '#fff',
            fontSize: 12,
            transition: 0.3
          }}
        >
        <Button onClick={() => setOpenedNew(true)} className="create-btn blue-btn" variant="light">
          New Project Row
        </Button>
      </Tooltip>
      </Flex>
      <Box sx={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Button variant="outline" mr={10} color="cyan" onClick={() => changeWeek(-1)}>
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
                    <div>
                      {date.format('dddd,')}
                      <br />
                      {date.format('MMMM Do')}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollX>
      </MainCard>
      <Box sx={{ margin: '10px 0px', display: 'flex', justifyContent: 'end' }}>
        <Button variant="outline" color="cyan" onClick={() => saveDates()}>
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
