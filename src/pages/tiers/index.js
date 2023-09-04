import { useState, Fragment } from 'react';
import { useMutation, useQuery } from 'react-query';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, List, ListItem, ListItemIcon, ListItemText, Stack, Switch, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets
import { CheckOutlined } from '@ant-design/icons';
import StandardPlusLogo from 'assets/images/price/StandardPlus';
import { createPayment } from 'hooks/stripe';
import useAuth from 'hooks/useAuth';
import { ActionIcon, Button, Text } from '@mantine/core';
import { getUser } from 'hooks/users';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';

// plan list
const plans = [
  // {
  //   active: false,
  //   icon: <StandardLogo />,
  //   title: 'Basic',
  //   description:
  //     'Create one end product for a client, transfer that end product to your client, charge them for your services. The license is then transferred to the client.',
  //   monthly: 5,
  //   monthlyId: 'price_1MZlr8EyxV4PorzikcsJua21',
  //   tierMonthly: 'BASIC',
  //   yearly: 50,
  //   yearlyId: 'price_1MZlr8EyxV4Porzip2CDukTd',
  //   tierYearly: 'BASICYEARLY',
  //   permission: [0, 1]
  // },
  {
    active: true,
    icon: <StandardPlusLogo />,
    title: 'Freelancer',
    description:
      'Create one end product for a client, transfer that end product to your client, charge them for your services. The license is then transferred to the client.',
    monthly: 25,
    monthlyId: 'price_1MtrcaEyxV4PorziB0YtgAxt',
    // monthlyId: 'price_1MaANmEyxV4PorziCfkDUCDO',
    tierMonthly: 'BASIC',
    yearly: 250,
    yearlyId: 'price_1MtrcaEyxV4PorzijSUPUsox',
    // yearlyId: 'price_1MaANmEyxV4PorzifRvAYceV',
    tierYearly: 'BASICYEARLY',
    permission: [0, 1, 2, 3, 4, 5, 6]
  },
  {
    active: true,
    icon: <StandardPlusLogo />,
    title: 'Agency',
    description:
      'Create one end product for a client, transfer that end product to your client, charge them for your services. The license is then transferred to the client.',
    monthly: 25,
    monthlyId: 'price_1MtrcaEyxV4PorziB0YtgAxt',
    // monthlyId: 'price_1MaANmEyxV4PorziCfkDUCDO',
    tierMonthly: 'ADVANCED',
    yearly: 250,
    yearlyId: 'price_1MtrcaEyxV4PorzijSUPUsox',
    // yearlyId: 'price_1MaANmEyxV4PorzifRvAYceV',
    tierYearly: 'ADVANCEDYEARLY',
    permission: [0, 1, 2, 3, 4, 5, 6]
  },
  {
    active: true,
    icon: <StandardPlusLogo />,
    title: 'Enterprise',
    description:
      'Create one end product for a client, transfer that end product to your client, charge them for your services. The license is then transferred to the client.',
    monthly: 25,
    monthlyId: 'price_1MtrcaEyxV4PorziB0YtgAxt',
    // monthlyId: 'price_1MaANmEyxV4PorziCfkDUCDO',
    tierMonthly: 'PREMIUM',
    yearly: 250,
    yearlyId: 'price_1MtrcaEyxV4PorzijSUPUsox',
    // yearlyId: 'price_1MaANmEyxV4PorzifRvAYceV',
    tierYearly: 'PREMIUMYEARLY',
    permission: [0, 1, 2, 3, 4, 5, 6]
  }
  // {
  //   active: false,
  //   icon: <Logo isIcon sx={{ width: 36, height: 36 }} />,
  //   title: 'Premium',
  //   description:
  //     'Create one end product for a client, transfer that end product to your client, charge them for your services. The license is then transferred to the client.',
  //   monthly: 40,
  //   monthlyId: 'price_1MaAOpEyxV4PorziAcvZ5hqW',
  //   tierMonthly: 'PREMIUM',
  //   yearly: 400,
  //   yearlyId: 'price_1MaAOpEyxV4PorzitKAmMaM3',
  //   tierYearly: 'PREMIUMYEARLY',
  //   permission: [0, 1, 2, 3, 5]
  // }
];

const planList = [
  'Unlimited Gigs', // 0
  'Unlimited Projects', // 1
  'Gig Sales Page', // 2
  'Task Manager', // 3
  'Requirements Management', // 4
  'Handle Payments', // 5
  'Meetings Manager' //6
];

const Pricing = () => {
  const theme = useTheme();
  const history = useNavigate();
  const { user } = useAuth();
  const userId = user.id;
  const { data: userInfo, isLoading: loadingUser } = useQuery(['getUser'], () => getUser({ userId }));
  const [timePeriod, setTimePeriod] = useState(false);
  const { mutate, isLoading } = useMutation(['createPayment'], (variables) => createPayment(variables), {
    onSuccess: (session) => {
      window.open(session.url, '_blank');
    },
    onError: (e) => console.log(e)
  });

  if (loadingUser) {
    return <div>Loading user subscription...</div>;
  }
  const priceListDisable = {
    opacity: 0.4,
    '& >div> svg': {
      fill: theme.palette.secondary.light
    }
  };

  function handleOrder(plan) {
    const priceId = timePeriod ? plan.monthlyId : plan.yearlyId;
    const tier = timePeriod ? plan.tierMonthly : plan.tierYearly;
    const variables = { userId, priceId, email: user.email, debug: false, tier, returnBaseUrl: window.location.origin };
    return mutate({ variables });
  }

  let tier = userInfo.tier;
  if (tier === 'BASICYEARLY') {
    tier = 'BASIC';
  } else if (tier === 'ADVANCEDYEARLY') {
    tier = 'ADVANCED';
  } else if (tier === 'PREMIUMYEARLY') {
    tier = 'PREMIUM';
  }

  if (dayjs(userInfo?.paidUntil).isAfter(dayjs())) {
    history('/dashboard');
  }

  return (
    <>
      {dayjs(userInfo?.paidUntil).isAfter(dayjs()) ? (
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <MainCard className="text-center">
              <h1>SUBSCRIPTION</h1>
              <h4>Renews Automatically: {dayjs(userInfo?.paidUntil).format('MMMM DD, YYYY')}</h4>
              <h4>If you would like to change your subscription, please contact support.</h4>
              <Button disabled={dayjs(userInfo?.paidUntil).isAfter(dayjs())} onClick={() => history('/gigs')} variant="contained">
                Dashboard
              </Button>
            </MainCard>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard>
              <Grid container item xs={12} md={9} lg={7}>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1.5} alignItems="center" textAlign="center">
                    <Typography variant="subtitle1" color={timePeriod ? 'textSecondary' : 'textPrimary'}>
                      Billed Yearly
                    </Typography>
                    <Switch checked={timePeriod} onChange={() => setTimePeriod(!timePeriod)} inputProps={{ 'aria-label': 'container' }} />
                    <Typography variant="subtitle1" color={timePeriod ? 'textPrimary' : 'textSecondary'}>
                      Billed Monthly
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item container spacing={3} xs={12}>
            {plans.map((plan, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <MainCard sx={{ pt: 1.75 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Stack direction="row" spacing={2} textAlign="center">
                        {plan.icon}
                        <Typography variant="h4">{plan.title}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>{plan.description}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction="row" spacing={1} alignItems="flex-end">
                        {timePeriod && <Typography variant="h2">${plan.monthly}</Typography>}
                        {!timePeriod && <Typography variant="h2">${plan.yearly}</Typography>}
                        <Typography variant="h6" color="textSecondary">
                          {timePeriod ? '/ Month' : ' / Year'}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <ActionIcon
                        onClick={() => handleOrder(plan)}
                        loading={isLoading}
                        sx={{ width: '100%' }}
                        color="green"
                        variant={plan.active ? 'contained' : 'outlined'}
                      >
                        <Text>Subscribe Now</Text>
                      </ActionIcon>
                    </Grid>
                    <Grid item xs={12}>
                      <List
                        sx={{
                          m: 0,
                          p: 0,
                          '&> li': {
                            px: 0,
                            py: 0.625,
                            '& svg': {
                              fill: theme.palette.success.dark
                            }
                          }
                        }}
                        component="ul"
                      >
                        {planList.map((list, i) => (
                          <Fragment key={i}>
                            <ListItem sx={!plan.permission.includes(i) ? priceListDisable : {}} divider>
                              <ListItemIcon>
                                <CheckOutlined />
                              </ListItemIcon>
                              <ListItemText primary={list} />
                            </ListItem>
                          </Fragment>
                        ))}
                      </List>
                    </Grid>
                  </Grid>
                </MainCard>
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Pricing;
