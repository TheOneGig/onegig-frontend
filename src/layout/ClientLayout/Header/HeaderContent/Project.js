import { useRef, useState } from 'react';
import {useQuery} from 'react-query'

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, InputLabel, Select, MenuItem, FormControl } from '@mui/material';

import { getClientProjects } from 'hooks/projects';
// project import

// sx styles
const avatarSX = {
  width: 48,
  height: 48
};


// ==============================|| HEADER CONTENT - MESSAGES ||============================== //

const SelectProject = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const clientId = 'clnazs8470000ys0o34wasmld'
  const { data: projects, isLoading, refetch } = useQuery(['projects'], () => getClientProjects({ clientId }));



  const handleChange = (e) => {
    setSelectedProject(
      e.target.value
    )
  }
  return (
    <Box sx={{ flexShrink: 0, ml: 0.75, width: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Project</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedProject}
          label="Project"
          onChange={handleChange}
        >
          {projects?.map((project, index) => {

            return <MenuItem key={index} value={project.projectId}>{project.name}</MenuItem>
          }) 
          
          }
        
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectProject;
