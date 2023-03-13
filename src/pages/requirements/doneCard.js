import MainCard from 'components/MainCard';
import PropTypes from 'prop-types';

const DoneCard = ({ project }) => {
  return (
    <MainCard className="text-center">
      <h2>
        Congrats <span className="text-green">{project.clientName}</span>! Its time to get to work!
      </h2>
      <h1>
        Now that you have given all requirements necessary, {project.owner?.fname} will start your project. If there is anything else
        needed, you will be contacted via email.
      </h1>
      <h4>
        If you need to contact {project.owner?.fname}, you can do so by email at{' '}
        <a href={`mailto:${project.owner?.email}`}>{project.owner?.email}</a>
      </h4>
    </MainCard>
  );
};

DoneCard.propTypes = {
  project: PropTypes.object
};

export default DoneCard;
