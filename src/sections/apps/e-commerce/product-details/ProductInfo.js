import PropTypes from 'prop-types';

import { Button, Rating, Stack, Typography } from '@mui/material';

// assets
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { formatUSD } from 'utils/formatUSD';

// ==============================|| PRODUCT DETAILS - INFORMATION ||============================== //

const ProductInfo = ({ gig }) => {
  const interested = () => {
    console.log('Interested modal open');
  };

  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Rating
          name="simple-controlled"
          value={gig.rating ? gig.rating : 5}
          icon={<StarFilled style={{ fontSize: 'inherit' }} />}
          emptyIcon={<StarOutlined style={{ fontSize: 'inherit' }} />}
          precision={0.1}
          readOnly
        />
        <Typography color="textSecondary">({gig.rating?.toFixed(1)})</Typography>
      </Stack>
      <Typography variant="h3">{gig.name}</Typography>
      <Typography color="textSecondary">{gig.description}</Typography>
      <Stack spacing={2.5}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="h3">{formatUSD(gig.price)}</Typography>
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 4 }}>
        <Button fullWidth color="secondary" variant="outlined" size="large" onClick={interested}>
          {`I'm interested`}
        </Button>
      </Stack>
    </Stack>
  );
};

ProductInfo.propTypes = {
  gig: PropTypes.object
};

export default ProductInfo;
