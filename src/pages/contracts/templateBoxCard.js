import React, { useState } from "react";
import { Card, Image, Text } from "@mantine/core";
import templateImg from "../../assets/images/icons/document-icon.png";

const SingleTemplateCard = ({ template, onTemplateSelect }) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    if (onTemplateSelect) {
      onTemplateSelect(template.fileUrl);
    }
  };

  const cardStyle = selected ? { border: '3px solid teal', borderRadius: '10px', width: "250px", marginBottom: '1rem' } : { borderRadius: '10px', width: "250px", marginBottom: '1rem' };

  return (
    <Card style={cardStyle} onClick={handleClick}>
      <Image
        src={templateImg}
        alt={template.title}
        fit="cover"
      />
      <Text size="lg" weight={500} style={{ marginTop: "1rem", textAlign: 'center' }}>
        {template.title}
      </Text>
    </Card>
  );
};

export default SingleTemplateCard;
