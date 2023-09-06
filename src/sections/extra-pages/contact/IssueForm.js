// react

import React, { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Checkbox, Grid, Stack, TextField, Typography, MenuItem, Select, Input } from '@mui/material';

// ==============================|| REPORT ISSUE- FORM ||============================== //

function IssueForm() {
  const theme = useTheme();

  // State to store the selected image file and its preview URL
  // const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Function to handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <Box sx={{ p: { xs: 2.5, sm: 0 } }}>
      <Grid container spacing={5} justifyContent="center">
        <Grid item xs={12} sm={10} lg={9}>
          <Stack alignItems="center" justifyContent="center" spacing={2}>
            <Typography align="center" variant="h2">
              Report Issue or Bug
            </Typography>
            <Typography variant="caption" align="center" color="textSecondary" sx={{ maxWidth: '355px' }}>
              Every issue or bug reported helps us improve our app, This translates to a better user experience. So please use this form to
              report any issue or bug you may encounter.
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={10} lg={9}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Please Insert your name</Typography>
              <TextField fullWidth type="text" placeholder="Name and last name" sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Company Name</Typography>
              <TextField fullWidth type="text" placeholder="Company Name" sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">E-mail</Typography>
              <TextField fullWidth type="email" placeholder="Email Address" sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Browser Used</Typography>
              <Select fullWidth variant="outlined" defaultValue="option0" sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}>
                <MenuItem value="option0">Select an option</MenuItem>
                <MenuItem value="option1">All</MenuItem>
                <MenuItem value="option2">Chrome</MenuItem>
                <MenuItem value="option3">Safari</MenuItem>
                <MenuItem value="option4">Edge</MenuItem>
                <MenuItem value="option5">Firefox</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Upload a Photo or Image of the Issue/Bug.</Typography>
              <label htmlFor="photo-upload">
                <Input accept="image/*" id="photo-upload" type="file" sx={{ display: 'none' }} onChange={handleImageChange} />
                <Button variant="outlined" component="span">
                  Upload Photo
                </Button>
              </label>
              {imagePreview && <img src={imagePreview} alt="Selected file" style={{ maxWidth: '100%', marginTop: '10px' }} />}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Please describe the issue/bug</Typography>
              <TextField fullWidth multiline rows={4} placeholder="Message" sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1">Whould you like to receive a follow up message regarding the issue/bug submitted?</Typography>
          <Select fullWidth variant="outlined" defaultValue="option0" sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}>
            <MenuItem value="option0">Select an option</MenuItem>
            <MenuItem value="option1">Yes</MenuItem>
            <MenuItem value="option2">No</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={10} lg={9}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1 }}
            justifyContent="space-between"
            alignItems={{ xs: 'stretch', sm: 'center' }}
          >
            <Stack direction="row" alignItems="center" sx={{ ml: -1 }}>
              <Checkbox sx={{ '& .css-1vjb4cj': { borderRadius: '2px' } }} defaultChecked />
              <Typography>
                By submitting this, you agree to the{' '}
                <Typography sx={{ cursor: 'pointer' }} component="span" color={theme.palette.primary.main}>
                  Privacy Policy
                </Typography>{' '}
                and{' '}
                <Typography sx={{ cursor: 'pointer' }} component="span" color={theme.palette.primary.main}>
                  Cookie Policy
                </Typography>{' '}
              </Typography>
            </Stack>
            <Button variant="contained" sx={{ ml: { xs: 0 } }}>
              Submit
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
export default IssueForm;
