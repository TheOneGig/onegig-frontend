import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Text } from '@mantine/core';
import { CheckCircleOutlined } from '@ant-design/icons';
import templateImg from '../../assets/images/icons/document-icon.png';

const SingleTemplateCard = ({ template, signedPdf, selected, onTemplateSelect }) => {
  const handleClick = () => {
    onTemplateSelect(template);
  };

  const cardStyle = {
    borderRadius: '10px',
    marginBottom: '1rem',
    width: '280px',
    border: selected ? '3px solid teal' : '1px solid black',
    height: '300px',
    backgroundColor: '#1e1e1e',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.15)'
  };

  return (
    <>
      <Card style={cardStyle} onClick={handleClick}>
        {signedPdf === template.templateId ? <CheckCircleOutlined style={{ color: 'teal', fontSize: '28px' }} /> : null}
        <Image src={templateImg} style={{ margin: 'auto' }} width={200} alt={template.title} />
        <Text size={'lg'} weight={500} style={{ marginTop: '1rem', textAlign: 'center' }}>
          {template.title}
        </Text>
      </Card>
    </>
  );
};

SingleTemplateCard.propTypes = {
  template: PropTypes.object,
  signedPdf: PropTypes.string,
  selected: PropTypes.bool,
  onTemplateSelect: PropTypes.func
};

export default SingleTemplateCard;
