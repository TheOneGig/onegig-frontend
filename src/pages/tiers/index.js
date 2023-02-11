import { useState, Fragment } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, List, ListItem, ListItemIcon, ListItemText, Stack, Switch, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets
import { CheckOutlined } from '@ant-design/icons';
import StandardLogo from 'assets/images/price/Standard';
import StandardPlusLogo from 'assets/images/price/StandardPlus';
import Logo from 'components/logo';
import { createPayment } from 'hooks/stripe';
import { useMutation } from 'react-query';
import useAuth from 'hooks/useAuth';
import { ActionIcon, Text } from '@mantine/core';

// plan list
const plans = [
  {
    active: false,
    icon: <StandardLogo />,
    title: 'Basic',
    description:
      'Create one end product for a client, transfer that end product to your client, charge them for your services. The license is then transferred to the client.',
    monthly: 5,
    monthlyId: 'price_1MZlr8EyxV4PorzikcsJua21',
    yearly: 50,
    yearlyId: 'price_1MZlr8EyxV4Porzip2CDukTd',
    permission: [0, 1]
  },
  {
    active: true,
    icon: <StandardPlusLogo />,
    title: 'Advanced',
    description:
      'Create one end product for a client, transfer that end product to your client, charge them for your services. The license is then transferred to the client.',
    monthly: 25,
    monthlyId: 'price_1MaANmEyxV4PorziCfkDUCDO',
    yearly: 250,
    yearlyId: 'price_1MaANmEyxV4PorzifRvAYceV',
    permission: [0, 1, 2, 3]
  },
  {
    active: false,
    icon: <Logo isIcon sx={{ width: 36, height: 36 }} />,
    title: 'Premium',
    description:
      'Create one end product for a client, transfer that end product to your client, charge them for your services. The license is then transferred to the client.',
    monthly: 40,
    monthlyId: 'price_1MaAOpEyxV4PorziAcvZ5hqW',
    yearly: 400,
    yearlyId: 'price_1MaAOpEyxV4PorzitKAmMaM3',
    permission: [0, 1, 2, 3, 5]
  }
];

const planList = [
  'One End Product', // 0
  'No attribution required', // 1
  'TypeScript', // 2
  'Figma Design Resources', // 3
  'Create Multiple Products', // 4
  'Create a SaaS Project', // 5
  'Resale Product', // 6
  'Separate sale of our UI Elements?' // 7
];

const Pricing = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const userId = user.id;
  const [timePeriod, setTimePeriod] = useState(true);
  const { mutate, isLoading } = useMutation(['createPayment'], (variables) => createPayment(variables), {
    onSuccess: (session) => {
      window.open(session.url, '_blank');
    },
    onError: (e) => console.log(e)
  });

  const priceListDisable = {
    opacity: 0.4,
    '& >div> svg': {
      fill: theme.palette.secondary.light
    }
  };

  function handleOrder(plan) {
    const priceId = timePeriod ? plan.monthlyId : plan.yearlyId;
    const variables = { userId, priceId, email: user.email, debug: true };
    return mutate({ variables });
  }

  return (
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
                    <Text>Order Now</Text>
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
  );
};

export default Pricing;
