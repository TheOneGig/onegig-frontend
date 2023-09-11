// material-ui
import { useMutation, useQuery } from 'react-query';
import { useOutletContext } from 'react-router';
import { useState } from 'react';

//import { useDispatch } from 'react-redux';

// material-ui
import { Box, Button, CardHeader, Divider, FormHelperText, Grid, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
//import { openSnackbar } from 'store/reducers/snackbar';
import MainCard from 'components/MainCard';

// assets
import { getWorkspace, updateWorkspace } from 'hooks/workspace';
import { SketchPicker } from 'react-color'
import useWorkspace from 'hooks/useWorkspace';
import { CardMedia } from '@mui/material';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { uploadFile } from 'react-s3';
import useAuth from 'hooks/useAuth'; 
import { useTheme } from '@mui/material/styles';


function useInputRef() {
  return useOutletContext();
}

const config = {
  bucketName: 'onegig-uploads',
  region: 'us-east-1',
  accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET_ACCESS_KEY
};
// ==============================|| TAB - PERSONAL ||============================== //

const CompanyProfile = () => {
  //const dispatch = useDispatch();
  const theme = useTheme();
  const inputRef = useInputRef();
  const [color1, setColor1] = useState(theme.palette.primary.main)
  const [color2, setColor2] = useState(theme.palette.info.main)
  // Step 2: Add state to store profile picture URL
  const { user } = useAuth();

  const [icon, setIcon] = useState(user?.workspaceId?.icon?.fileUrl);
  const { worskpaceId } = useWorkspace();
  const { data: companyInfo, isLoading, refetch } = useQuery(['workspace'], () => getWorkspace({ worskpaceId }));
  const { mutate } = useMutation(['updateWorkspace'], (variables) => updateWorkspace(variables), {
    onSuccess: () => {
      refetch();
      showNotification({
        id: 'load-data',
        color: 'blue',
        title: 'Workspace Updated!',
        message: 'Congratulations! your Workspace was updated successfully, you can close this notification',
        icon: <IconCheck size="1rem" />,
        autoClose: 3000
      });
    }
  });
  const companyName1 = user?.workspaceId?.companyName
  const email1 = user?.email

  if (isLoading) {
    return <div>Loading Workspace...</div>;
  }
  const { companyName, email, phone, description } = companyInfo || {
    companyName: '',
    email: '',
    phone: '',
    description: ''
  };

  console.log(companyName)
  console.log(email)

  const handleSubmit = (values) => {
    const variables = {
      worskpaceId: worskpaceId,
      companyName: values.companyName,
      email: values.email,
      phone: values.phone,
      description: values.description,
      fileUrl: icon,
      primaryColor: color1,
      secondaryColor: color2
    };
    console.log(variables)
    localStorage.setItem('primaryColor', variables.primaryColor);
    localStorage.setItem('secondaryColor', variables.secondaryColor);
    return mutate({ variables });
  };
  const handleUpload = async (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setIcon(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      showNotification({
        id: 'load-data',
        color: 'teal',
        title: 'Icon Uploading!',
        message: 'Your icon is uploading, please wait a moment',
        icon: <IconCheck size="1rem" />,
        autoClose: 3000
      });
      uploadFile(file, config)
        .then((data) => setIcon(data.location))
        .catch((err) => console.error(err));
    }
  };

  return (
    <MainCard content={false} title="Company Information" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
      <label
        htmlFor="profile-picture-input"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '175px', cursor: 'pointer' }}
      >
        <CardMedia component="img" sx={{ width: '150px', height: '150px', borderRadius: '50%' }} image={icon} alt="Company Picture" />
        {/* Step 5: Add an input of type "file" to trigger file upload */}
        <input id="profile-picture-input" type="file" hidden onChange={(e) => handleUpload(e.target.files?.[0])} accept="image/*" />
      </label>
      <Formik
        initialValues={{
          companyName: companyName1 ? companyName1: '',
          email: email1 ? email1 : '',
          phone: phone ? phone : '',
          description: description ? description : '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          companyName: Yup.string().max(255).required('Company Name is required.'),
          email: Yup.string().email('Invalid email address.').max(255).required('Email is required.'),
          // dob: Yup.date().max(maxDate, 'Age should be 18+ years.').required('Date of birth is requird.'),
          phone: Yup.number()
            .test('len', 'Contact should be exactly 10 digit', (val) => val?.toString().length === 10)
            .required('Phone number is required'),

          description: Yup.string().min(50, 'Description should be more then 50 char.')
        })}
        onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
          try {
            handleSubmit(values);
            setStatus({ success: true });
            setSubmitting(false);
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Box sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="company-name">Company Name</InputLabel>
                    <TextField
                      fullWidth
                      id="company-name"
                      value={values.companyName}
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Company Name"
                      autoFocus
                      inputRef={inputRef}
                    />
                    {touched.name && errors.name && (
                      <FormHelperText error id="company-name-helper">
                        {errors.name}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="company-email">Email Address</InputLabel>
                    <TextField
                      type="email"
                      fullWidth
                      name="email"
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="company-email"
                      placeholder="Email Address"
                    />
                    {touched.email && errors.email && (
                      <FormHelperText error id="company-email-helper">
                        {errors.email}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="company-phone">Phone Number</InputLabel>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                      <Select name="countryCode" onBlur={handleBlur} onChange={handleChange}>
                        <MenuItem value="+1">+1</MenuItem>
                      </Select>
                      <TextField
                        fullWidth
                        id="company-contact"
                        value={values.phone}
                        name="phone"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Phone Number"
                      />
                    </Stack>
                    {touched.phone && errors.phone && (
                      <FormHelperText error id="company-contact-helper">
                        {errors.phone}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <CardHeader title="Theme Colors" />
            <Divider />
            <Box sx={{ p: 1 }}>
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={8} sx={{ mt: 2.5 }}>
                <Stack spacing={1.25}>
                      <InputLabel htmlFor="primary">Primary Color:</InputLabel>
                <SketchPicker
                    width='300px'
                    height='220px'
                    color={color1}
                    onChangeComplete={(color) => setColor1(color.hex)}
                  />
                </Stack>
                <Stack spacing={1.25}>
                      <InputLabel htmlFor="secondary">Secondary Color:</InputLabel>
                  <SketchPicker
                    width='300px'
                    height='250px'
                    color={color2}
                    onChangeComplete={(color) => setColor2(color.hex)}
                  />
                </Stack>
              </Stack>
            </Box>
            <CardHeader title="Description" />
            <Divider />
            <Box sx={{ p: 2.5 }}>
              <TextField
                multiline
                rows={5}
                fullWidth
                value={values.description}
                name="description"
                onBlur={handleBlur}
                onChange={handleChange}
                id="personal-note"
                placeholder="Description"
              />
              {touched.description && errors.description && (
                <FormHelperText error id="personal-note-helper">
                  {errors.description}
                </FormHelperText>
              )}
              <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                <Button disabled={isSubmitting} type="submit" variant='contained'>
                  Save
                </Button>
              </Stack>
            </Box>
          </form>
        )}
      </Formik>
    </MainCard>
  );
};

export default CompanyProfile;
