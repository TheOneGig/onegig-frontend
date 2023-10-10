import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Notification, Modal } from '@mantine/core';

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const TimeReport = ({ times, allProjects }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const printRef = React.useRef();

  const handledownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('report.pdf');
  };
  //Open and close the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
      }, 1000);
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
          {/* Step 4: Render the modal conditionally */}
          <Button onClick={openModal} variant="outline" color="cyan">
            View Report
          </Button>

          {/* The Report */}
          <Modal className="custom-modal" size="lg" opened={isModalOpen} onClose={closeModal}>
            <p>Total Hours Worked per Project</p>
            <Table ref={printRef} className="custom-table">
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
            <Button sx={{ margin: '15px' }} mt="md" onClick={handleSendReport} variant="outline" color="cyan">
              Send Report
            </Button>
            <Button sx={{ margin: '15px' }} mt="md" onClick={handledownloadPdf} variant="outline" color="cyan">
              Export to PDF
            </Button>
          </Modal>
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
