import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Notification } from '@mantine/core';

const TimeReport = ({ times, allProjects }) => {
  // State to store total hours per project
  const [totalHoursPerProject, setTotalHoursPerProject] = useState({});
  const [reportSent, setReportSent] = useState(false);

  // Function to calculate total hours worked for each project
  const calculateTotalHoursPerProject = useCallback(() => {
    const newTotalHoursPerProject = {};

    Object.keys(times).forEach((projectId) => {
      newTotalHoursPerProject[projectId] = 0;

      Object.keys(times[projectId]).forEach((date) => {
        newTotalHoursPerProject[projectId] += times[projectId][date].hours;
      });
    });

    setTotalHoursPerProject(newTotalHoursPerProject);
  }, [times]);
  // Recalculate total hours when the times prop changes
  useEffect(() => {
    calculateTotalHoursPerProject();
  }, [times, calculateTotalHoursPerProject]);

  const handleSendReport = () => {
    // Replace this with your actual logic to send the report
    // Simulating the sending process with a delay of 1.5 seconds
    setTimeout(() => {
      setReportSent(true);

      // Refresh the page after 2 seconds (2000 milliseconds)
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }, 1500);
  };

  return (
    <div>
      {reportSent ? (
        <div>
          <Notification title="Report Sent!" color="teal" disallowClose />
        </div>
      ) : (
        <div>
          <h2>Time Report - Total Hours Worked per Project</h2>
          <Table>
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Total Hours</th>
              </tr>
            </thead>
            <tbody>
              {allProjects.map((project) => (
                <tr key={project.projectId}>
                  <td>{project.name}</td>
                  <td>{totalHoursPerProject[project.projectId] || 0}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button onClick={handleSendReport} className="green-btn" style={{ marginTop: '16px' }}>
            Send Report
          </Button>
        </div>
      )}
    </div>
  );
};

TimeReport.propTypes = {
  times: PropTypes.objectOf(
    PropTypes.objectOf(
      PropTypes.shape({
        hours: PropTypes.number.isRequired
      })
    )
  ).isRequired,
  allProjects: PropTypes.arrayOf(
    PropTypes.shape({
      projectId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
};

export default TimeReport;
