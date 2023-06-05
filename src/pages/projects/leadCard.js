import { useState } from 'react';
import { useMutation } from 'react-query';
import { Card, Text, Badge, Button, Group, Grid, Modal } from '@mantine/core';
import PropTypes from 'prop-types';
import { formatUSD } from 'utils/formatUSD';
import { deleteLead } from 'hooks/gigs';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

const LeadCard = ({ lead, refetch }) => {
  const [openedDelete, setOpenedDelete] = useState(false);
  const { mutate, isLoading: loadingDelete } = useMutation(['deleteLead'], (variables) => deleteLead(variables), {
    onSuccess: () => {
      refetch();
      setOpenedDelete(false);
      showNotification({
        id: 'load-data',
        color: 'red',
        title: 'Lead Deleted!',
        message: 'Lead deleted succesfully, you can close this notification',
        icon: <IconCheck size="1rem" />,
        autoClose: 3000,
      });
      form.reset();
    }
  });

  function handleDelete(leadId) {
    const variables = { leadId };
    return mutate({ variables });
  }

  return (
    <>
      <Grid.Col key={lead.leadId} xs={12} lg={4} sm={6}>
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>{lead.name}</Text>
            <Badge color="#1dbeea" variant="light">
              {formatUSD(lead.budget)}
            </Badge>
          </Group>

          <Text size="sm" color="dimmed">
            {lead.message}
          </Text>
          <Grid>
            <Grid.Col span={6}>
              <Button
                className="green-btn"
                mt="md"
                radius="md"
                fullWidth
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                href={`mailto:${lead.email}`}
              >
                Email Lead
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button className="red-btn" mt="md" radius="md" fullWidth onClick={() => setOpenedDelete(true)}>
                Delete Lead
              </Button>
            </Grid.Col>
          </Grid>
        </Card>
      </Grid.Col>

      <Modal opened={openedDelete} onClose={() => setOpenedDelete(false)} title="Delete lead?" centered>
        <div>
          <p>Are you sure you want to delete this lead? This is irreversible.</p>
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
              <Button className="red-btn" mt="md" radius="md" fullWidth onClick={() => handleDelete(lead.leadId)} loading={loadingDelete}>
                Yes, I am sure!
              </Button>
            </Grid.Col>
          </Grid>
        </div>
      </Modal>
    </>
  );
};

LeadCard.propTypes = {
  lead: PropTypes.object,
  refetch: PropTypes.func
};

export default LeadCard;
