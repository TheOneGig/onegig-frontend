import { Card, Image, Text, Badge, Button, Group, Grid } from '@mantine/core';
import PropTypes from 'prop-types';
import OneGigLogo from 'assets/images/brand/OneGig-Logo-Gradient.png';
import { formatUSD } from 'utils/formatUSD';
import { truncate } from 'utils/truncate';
import { useNavigate } from 'react-router';

const GigCard = ({ gig }) => {
  const history = useNavigate();
  return (
    <Card className="card-design" shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={gig.files?.length > 0 ? gig.files[0].fileUrl : OneGigLogo} alt="Gig" className="gig-card-image" />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{gig.name}</Text>
        <Badge className="blue-btn" variant="light">
          {formatUSD(gig.price)}
        </Badge>
      </Group>

      <div style={{ height: '112px' }}>
        <Text size="sm" color="dimmed" align="justify">
          {truncate(gig.description, 250)}
        </Text>
      </div>
      <Grid>
        <Grid.Col span={12}>
          <Button className="green-btn" mt="md" radius="md" fullWidth onClick={() => history(`/browse/gig/${gig.gigId}`)}>
            View
          </Button>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

GigCard.propTypes = {
  gig: PropTypes.object
};

export default GigCard;
