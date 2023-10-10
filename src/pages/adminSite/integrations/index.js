import React, { useState } from 'react'
import IntegrationCard from 'components/cards/IntegrationCard';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';
import Hubspot from 'assets/images/integrations/hubspot.png'
import Pipedrive from 'assets/images/integrations/pipedrive.png'
import Zapier from 'assets/images/integrations/zapier.png'
import Calendly from 'assets/images/integrations/calendly.png'
import Make from 'assets/images/integrations/make.png'
import Hyperise from 'assets/images/integrations/hyperise.png'
import Linked from 'assets/images/integrations/linkedhelper.png'
import Phantom from 'assets/images/integrations/phatombuster.png'
import Weblium from 'assets/images/integrations/Weblium.png'

const data = [
    {
        id: '1',
        name: 'Hubspot',
        description: 'Sales, customer care, marketing, CRM and more. Integrate HubSpot with Snov.io to unlock your potential.',
        image: Hubspot
    },
    {
        id: '2',
        name: 'Pipedrive',
        description: 'Sales CRM and pipeline management software to help you successfully track, prioritize, and manage deals',
        image: Pipedrive
    },
    {
        id: '3',
        name: 'Zapier',
        description: 'App integration platform to help you connect and automate your processes and boost productivity.',
        image: Zapier
    },
    {
        id: '4',
        name: 'Calendly',
        description: 'The best automated scheduling software for online appointments. Avoid double- bookings and email back-and-forth with easy one-click scheduling',
        image: Calendly
    },
    {
        id: '5',
        name: 'Make Formerly Integromat',
        description: 'An integration platform to connect apps and automate workflows with a no-code visual builder.',
        image: Make
    },
    {
        id: '6',
        name: 'Hyperise',
        description: 'A platform that automates visual personalization in your email campaigns. Integrate Hyperise with Snov.io to increase conversion rate and grow revenue.',
        image: Hyperise
    },
    {
        id: '7',
        name: 'Linked Helper',
        description: 'LinkedIn automation software and CRM that offers dozens of features to boost your lead generation on LinkedIn',
        image: Linked
    },
    {
        id: '8',
        name: 'Phantom Buster',
        description: 'A sales platform that can help you automate your sales lead extraction and generate more business leads online.',
        image: Phantom
    },
    {
        id: '9',
        name: 'Weblium',
        description: 'An easy solution for building websites that attract clients. Collect leads and automate sales by integrating Snov.io with Weblium',
        image: Weblium
    },


]

const Integrations = () => {
    const theme = useTheme();
    const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  return (
    <Box>
    <h1>Integrations</h1>
    <Grid item xs={12}>
        <Grid container spacing={3}>
        {  data.map((product, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
            <IntegrationCard
                id={product.id}
                image={product.image}
                name={product.name}
                description={product.description}
                open={openFilterDrawer}
            />
            </Grid>
            
        ))}
        </Grid>
      </Grid>
    </Box>
  )
}


export default Integrations