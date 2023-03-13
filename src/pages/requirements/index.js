import { useState } from 'react';
import { useParams } from 'react-router';
import { useMutation, useQuery } from 'react-query';

import { Button, Stepper, Textarea } from '@mantine/core';
import { getRequirements, updateRequirement } from 'hooks/requirements';
import { getProject } from 'hooks/projects';
import WelcomeCard from './welcomeCard';
import DoneCard from './doneCard';

// ==============================|| REACT TABLE - BASIC ||============================== //

const Requirements = () => {
  const { projectId } = useParams();
  const [active, setActive] = useState(-1);
  const [answer, setAnswer] = useState('');
  const { data: project, isLoading: loadingProject } = useQuery(['project'], () => getProject({ projectId }));
  const { data: allRequirements, isLoading, refetch } = useQuery(['allRequirements'], () => getRequirements({ projectId }));

  const { mutate: editReq, isLoading: loadingEdit } = useMutation(['updateReq'], (variables) => updateRequirement(variables), {
    onSuccess: () => {
      refetch();
      handleActive(active + 1);
    }
  });

  function handleEdit(requirementId) {
    const variables = {
      requirementId,
      answer
    };
    return editReq({ variables });
  }

  if (isLoading || loadingProject) {
    return <div>Loading Requirements...</div>;
  }

  function handleActive(index) {
    setActive(index);
    setAnswer(allRequirements[index]?.answer);
  }

  if (active === -1) {
    return <WelcomeCard project={project} startReqs={() => handleActive(0)} />;
  } else if (active === allRequirements.length) {
    return <DoneCard project={project} />;
  } else {
    return (
      <Stepper active={active} onStepClick={handleActive}>
        {allRequirements.map((requirement) => {
          return (
            <Stepper.Step label={`Requirement ${requirement.order}`} description={requirement.requirement} key={requirement.requirementId}>
              <h1>{requirement.requirement}</h1>
              <Textarea value={answer} onChange={(event) => setAnswer(event.currentTarget.value)} autosize minRows={3} />
              <Button
                className="green-btn"
                mt="md"
                radius="md"
                fullWidth
                onClick={() => handleEdit(requirement.requirementId)}
                loading={loadingEdit}
              >
                Save & Next
              </Button>
            </Stepper.Step>
          );
        })}
      </Stepper>
    );
  }
};

export default Requirements;
