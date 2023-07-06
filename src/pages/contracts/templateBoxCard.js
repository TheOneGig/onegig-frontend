import React from 'react';
import PropTypes from 'prop-types';
import { Card, Divider, Image, Text } from '@mantine/core';
import { CheckCircleOutlined } from '@ant-design/icons';

const SingleTemplateCard = ({ template, signedPdf, selected, onTemplateSelect }) => {
  const handleClick = () => {
    onTemplateSelect(template);
  };

  const cardStyle = {
    borderRadius: '6px',
    marginBottom: '1rem',
    width: '300px',
    border: selected ? '1px solid #1dbeea' : '1px solid black',
    height: '240px',
    backgroundColor: '#1e1e1e',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.15)'
  };

  return (
    <>
      <Card style={cardStyle} onClick={handleClick}>
        <Text
          size={'lg'}
          weight={600}
          style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, textTransform: 'uppercase' }}
        >
          {template.title}{' '}
          {signedPdf === template.templateId ? <CheckCircleOutlined style={{ color: '#1dbeea', fontSize: '24px' }} /> : null}
        </Text>
        <Divider style={{ marginBottom: 5 }} />
        <div
          style={{
            border: '5px solid #424242',
            borderRadius: '2px',
            width: '270px',
            opacity: '0.9',
            margin: '0 auto',
            height: '160px',
            overflow: 'hidden'
          }}
        >
          <Image src={template.thumbnail} alt={template.title} />
        </div>
        <Divider style={{ marginTop: 5 }} />
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
