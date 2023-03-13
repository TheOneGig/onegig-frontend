import { useState } from 'react';
import { useParams } from 'react-router';
import { useMutation, useQuery } from 'react-query';

import { Button, Stepper } from '@mantine/core';
import { getRequirements, updateRequirement } from 'hooks/requirements';

// ==============================|| REACT TABLE - BASIC ||============================== //

const Requirements = () => {
  const { projectId } = useParams();
  const [active, setActive] = useState(0);
  // const [requirementId, setRequirementId] = useState(1);
  // const [answer, setAnswer] = useState('');
  const { data: allRequirements, isLoading } = useQuery(['allRequirements'], () => getRequirements({ projectId }));

  const { mutate: editReq, isLoading: loadingEdit } = useMutation(['updateReq'], (variables) => updateRequirement(variables), {
    onSuccess: () => {
      refetch();
    }
  });

  function handleEdit() {
    const variables = {
      requirementId: 0,
      answer: ''
    };
    return editReq({ variables });
  }

  if (isLoading) {
    return <div>Loading Requirements...</div>;
  }

  console.log(allRequirements);

  return (
    <>
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step label="Step 1" description="Create an account">
          <Button className="red-btn" mt="md" radius="md" fullWidth onClick={() => handleEdit()} loading={loadingEdit}>
            Save
          </Button>
        </Stepper.Step>
        <Stepper.Step label="Step 2" description="Verify email" />
        <Stepper.Step label="Step 3" description="Get full access" />
      </Stepper>
    </>
  );
};

export default Requirements;
