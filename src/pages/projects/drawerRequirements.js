import { Box, Drawer, Title } from '@mantine/core';
import PropTypes from 'prop-types';

// ==============================|| GIGS ||============================== //

const Requirements = ({ project, opened, setOpened }) => {
  return (
    <Drawer opened={opened} onClose={() => setOpened(false)} title="Requirements" padding="xl" size="40%" position="right">
      <Box>
        <Title order={1} sx={{ marginTop: '35px' }}>
          {`${project.name}'s Requirements`}
        </Title>
        {project.requirements?.map((requirement, index) => {
          return (
            <div key={requirement.requirementId} style={{ marginTop: '15px' }}>
              <b>{`${index + 1}) ${requirement.requirement}`}</b>
              <br />
              {requirement.answer}
            </div>
          );
        })}
      </Box>
    </Drawer>
  );
};

Requirements.propTypes = {
  project: PropTypes.object,
  opened: PropTypes.bool,
  setOpened: PropTypes.func
};

export default Requirements;
