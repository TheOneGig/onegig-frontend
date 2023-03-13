import { Card, Text, Badge, Button, Group, Grid } from '@mantine/core';
import PropTypes from 'prop-types';
import { formatUSD } from 'utils/formatUSD';

const LeadCard = ({ lead }) => {
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
            <Grid.Col span={12}>
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
          </Grid>
        </Card>
      </Grid.Col>
    </>
  );
};

LeadCard.propTypes = {
  lead: PropTypes.object,
  refetch: PropTypes.func,
  handleEdit: PropTypes.func
};

export default LeadCard;
