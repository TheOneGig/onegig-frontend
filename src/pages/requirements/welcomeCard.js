import { Button } from '@mantine/core';
import MainCard from 'components/MainCard';
import PropTypes from 'prop-types';

const WelcomeCard = ({ project, startReqs }) => {
  return (
    <MainCard className="text-center">
      <h2>
        Congrats <span className="text-green">{project.clientName}</span>! Its time to get to work!
      </h2>
      <h1>In order to start your project {project.owner?.fname} needs you to give them some requirements. Lets do that now!</h1>
      <Button className="green-btn" onClick={() => startReqs(1)}>
        Start Requirements
      </Button>
      <h4>
        If you need to contact {project.owner?.fname}, you can do so by email at{' '}
        <a href={`mailto:${project.owner?.email}`}>{project.owner?.email}</a>
      </h4>
    </MainCard>
  );
};

WelcomeCard.propTypes = {
  project: PropTypes.object,
  startReqs: PropTypes.func
};

export default WelcomeCard;
