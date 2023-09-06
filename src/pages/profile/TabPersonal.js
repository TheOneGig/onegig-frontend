// material-ui
import { useMutation, useQuery } from 'react-query';
import { useLocation, useNavigate, useOutletContext } from 'react-router';

import { useDispatch } from 'react-redux';

// material-ui
import {
  Autocomplete,
  Box,
  Button,
  CardHeader,
  Chip,
  Divider,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import { openSnackbar } from 'store/reducers/snackbar';
import MainCard from 'components/MainCard';
import useWorkspace from 'hooks/useWorkspace';
// assets
import { CloseOutlined } from '@ant-design/icons';
import { getUser, updateUser } from 'hooks/users';
import useAuth from 'hooks/useAuth';
import { getAllSkills, addSkill, removeSkill } from 'hooks/skills';
import { createNotification } from 'hooks/notifications';

function useInputRef() {
  return useOutletContext();
}

// ==============================|| TAB - PERSONAL ||============================== //

const TabPersonal = () => {
  const location = useLocation();
  const history = useNavigate();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);

  const dispatch = useDispatch();
  const inputRef = useInputRef();

  const { user } = useAuth();
  const userId = user.id;
  const { workspaceId } = useWorkspace();
  const createNotificationMutation = useMutation(createNotification);
  const { data: userInfo, isLoading, refetch } = useQuery(['user'], () => getUser({ userId }));
  const { data: allSkills, isLoading: loadingSkills } = useQuery(['allSkills'], () => getAllSkills());
  const { mutate } = useMutation(['updateUser'], (variables) => updateUser(variables), {
    onSuccess: () => {
      refetch();
      if (location.pathname === '/new/profile/personal') {
        history(`/${workspaceId}/dashboard`);
      }
      createNotificationMutation.mutate({
        variables: {
          userId: userId,
          message: 'Personal profile updated successfully'
        }
      });
      return true;
    }
  });

  const { mutate: skillAdd } = useMutation(['addSkill'], (variables) => addSkill(variables), {
    onSuccess: () => {
      refetch();
      return true;
    }
  });

  const { mutate: skillRemove } = useMutation(['removeSkill'], (variables) => removeSkill(variables), {
    onSuccess: () => {
      refetch();
      return true;
    }
  });
  if (isLoading || loadingSkills) {
    return <div>Loading dashboard...</div>;
  }
  const { fname, lname, email, nickname, phone, title, description, skills } = userInfo;
  const userSkills = skills.map((skill) => skill.skill);
  const skillsList = allSkills.map((skill) => skill.skill);

  function handleSubmit(values) {
    const { fname, lname, nickname, title, phone, dob, description } = values;
    const variables = { userId, fname, lname, nickname, title, phone, dob, description };
    return mutate({ variables });
  }

  function handleAddSkill(skill, newValue) {
    if (skill) {
      const newSkill = allSkills.find((s) => s.skill === skill);
      const variables = { userId, skillId: newSkill.skillId };
      return skillAdd({ variables });
    } else {
      const newArray = userSkills.filter(function (x) {
        return !newValue.includes(x);
      });
      handleRemoveSkill(newArray[0]);
    }
  }

  function handleRemoveSkill(skill) {
    const theSkill = allSkills.find((s) => s.skill === skill);
    const variables = { userId, skillId: theSkill.skillId };
    return skillRemove({ variables });
  }

  return (
    <MainCard content={false} title="Personal Information" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
      <Formik
        initialValues={{
          fname: fname ? fname : '',
          lname: lname ? lname : '',
          email: email ? email : '',
          countryCode: '+1',
          phone: phone ? phone : '',
          title: title ? title : '',
          skill: userSkills,
          description: description ? description : '',
          nickname: nickname ? nickname : '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          fname: Yup.string().max(255).required('First Name is required.'),
          lname: Yup.string().max(255).required('Last Name is required.'),
          email: Yup.string().email('Invalid email address.').max(255).required('Email is required.'),
          // dob: Yup.date().max(maxDate, 'Age should be 18+ years.').required('Date of birth is requird.'),
          phone: Yup.number()
            .test('len', 'Contact should be exactly 10 digit', (val) => val?.toString().length === 10)
            .required('Phone number is required'),
          title: Yup.string().required('Title is required'),
          nickname: Yup.string().required('Nickname is required'),
          description: Yup.string().min(50, 'Description should be more then 50 char.')
        })}
        onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
          try {
            handleSubmit(values);
            dispatch(
              openSnackbar({
                open: true,
                message: 'Personal profile updated successfully.',
                variant: 'alert',
                alert: {
                  color: 'success'
                },
                close: false
              })
            );
            setStatus({ success: true });
            setSubmitting(false);
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, setFieldValue, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Box sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-first-name">First Name</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-first-name"
                      value={values.fname}
                      name="fname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="First Name"
                      autoFocus
                      inputRef={inputRef}
                    />
                    {touched.fname && errors.fname && (
                      <FormHelperText error id="personal-first-name-helper">
                        {errors.fname}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-last-name">Last Name</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-last-name"
                      value={values.lname}
                      name="lname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Last Name"
                    />
                    {touched.lname && errors.lname && (
                      <FormHelperText error id="personal-last-name-helper">
                        {errors.lname}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-email">Email Address</InputLabel>
                    <TextField
                      type="email"
                      fullWidth
                      disabled
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="personal-email"
                      placeholder="Email Address"
                    />
                    {touched.email && errors.email && (
                      <FormHelperText error id="personal-email-helper">
                        {errors.email}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-phone">Phone Number</InputLabel>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                      <Select value={values.countryCode} name="countryCode" onBlur={handleBlur} onChange={handleChange}>
                        <MenuItem value="+1">+1</MenuItem>
                      </Select>
                      <TextField
                        fullWidth
                        id="personal-contact"
                        value={values.phone}
                        name="phone"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Phone Number"
                      />
                    </Stack>
                    {touched.phone && errors.phone && (
                      <FormHelperText error id="personal-contact-helper">
                        {errors.phone}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-designation">Title</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-designation"
                      value={values.title}
                      name="title"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Title"
                    />
                    {touched.title && errors.title && (
                      <FormHelperText error id="personal-designation-helper">
                        {errors.title}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-designation">Nickname</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-designation"
                      value={values.nickname}
                      name="nickname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nickname"
                    />
                    {touched.nickname && errors.nickname && (
                      <FormHelperText error id="personal-designation-helper">
                        {errors.nickname}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <CardHeader title="Skills" />
            <Divider />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', p: 2.5, m: 0 }} component="ul">
              <Autocomplete
                multiple
                fullWidth
                id="tags-outlined"
                options={skillsList}
                value={values.skill}
                onBlur={handleBlur}
                getOptionLabel={(label) => label}
                onChange={(event, newValue) => {
                  setFieldValue('skill', newValue);
                  handleAddSkill(event.target.innerText, newValue);
                }}
                renderInput={(params) => <TextField {...params} name="skill" placeholder="Add Skills" />}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      key={index}
                      {...getTagProps({ index })}
                      variant="combined"
                      label={option}
                      deleteIcon={<CloseOutlined style={{ fontSize: '0.75rem' }} />}
                      sx={{ color: 'text.primary' }}
                    />
                  ))
                }
                sx={{
                  '& .MuiOutlinedInput-root': {
                    p: 0,
                    '& .MuiAutocomplete-tag': {
                      m: 1
                    },
                    '& fieldset': {
                      display: 'none'
                    },
                    '& .MuiAutocomplete-endAdornment': {
                      display: 'none'
                    },
                    '& .MuiAutocomplete-popupIndicator': {
                      display: 'none'
                    }
                  }
                }}
              />
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
                <Button disabled={isSubmitting || Object.keys(errors).length !== 0} type="submit" variant="contained">
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

export default TabPersonal;
