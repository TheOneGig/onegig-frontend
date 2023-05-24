import React, { useState } from "react";
import { Card, Image, Text } from "@mantine/core";
import { CheckCircleOutlined } from '@ant-design/icons';
import templateImg from "../../assets/images/icons/document-icon.png";

const SingleTemplateCard = ({ template, signedPdf, onTemplateSelect }) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    if (onTemplateSelect) {
      onTemplateSelect(template.fileUrl);
    }
  };

  const cardStyle = {
    borderRadius: "10px",
    marginBottom: "1rem",
    width: "280px",
    border: selected ? "3px solid teal" :"1px solid black",
    height: "320px",
    backgroundColor:  "#1e1e1e",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.15)",
   
  }

  return (
    <>
      <CheckCircleOutlined
        style={
          { color: 'teal',
            fontSize: '28px',
            position: 'absolute',
            top: '150px',
            right: '200px',
            display: signedPdf ? '' : 'none'
          }}
      />
      <Card style={cardStyle} onClick={handleClick}>
        <Image
          src={templateImg}
          alt={template.title}
        />
        <Text size="lg" weight={500} style={{ marginTop: "1rem", textAlign: 'center' }}>
          {template.title}
        </Text>
      </Card>
    </>
  );
};

export default SingleTemplateCard;
