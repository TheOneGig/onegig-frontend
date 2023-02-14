import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import { getPayment } from 'hooks/stripe';
import dayjs from 'dayjs';

const Transaction = () => {
  const { paymentId } = useParams();
  const { data: payment, isLoading } = useQuery(['payment'], () => getPayment({ paymentId }));
  if (isLoading) {
    return <div>Loading transaction...</div>;
  }

  let tier = payment.tier;
  if (tier === 'BASICYEARLY') {
    tier = 'BASIC';
  } else if (tier === 'ADVANCEDYEARLY') {
    tier = 'ADVANCED';
  } else if (tier === 'PREMIUMYEARLY') {
    tier = 'PREMIUM';
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <MainCard className="text-center">
          <h1>TIER {tier}</h1>
          <h2 className={payment.status === 'PAID' ? 'text-green' : 'text-yellow'}>{payment.status}</h2>
          {payment.status === 'PAID' && <h4>Paid Until: {dayjs(payment.user?.paidUntil).format('MMMM DD, YYYY')}</h4>}
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Transaction;
