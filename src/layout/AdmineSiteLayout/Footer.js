import { Link, Stack, Typography } from '@mui/material';

const Footer = () => (
  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: '24px 16px 0px', mt: 'auto' }}>
    <Typography variant="caption">2023 &copy; OneGig. All rights reserved</Typography>
    <Stack spacing={1.5} direction="row" justifyContent="space-between" alignItems="center">
      <Link
        href="https://app.termly.io/document/privacy-policy/70a437d1-cbf8-482d-89a7-db3b09df80de"
        target="_blank"
        variant="caption"
        color="textPrimary"
      >
        Privacy
      </Link>
      <Link
        href="https://app.termly.io/document/terms-and-conditions/32bb3d85-701d-4f50-9c6c-4c13695cb658"
        target="_blank"
        variant="caption"
        color="textPrimary"
      >
        Terms
      </Link>
    </Stack>
  </Stack>
);

export default Footer;
