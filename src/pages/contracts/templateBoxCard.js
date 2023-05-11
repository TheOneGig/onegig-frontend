import React, { useState } from "react";
import { Card, Image, Text } from "@mantine/core";

const SingleTemplateCard = ({ template, onEdit }) => {
  const [selected, setSelected] = useState(false);
  const templateData = template || { name: 'Unnamed', preview: '' };

  const handleClick = () => {
    setSelected(!selected);
  };

  const cardStyle = selected ? { border: '3px solid teal', borderRadius: '10px', marginBottom: '1rem' } : { borderRadius: '10px', marginBottom: '1rem' };

  return (
    <Card style={cardStyle} onClick={handleClick}>
      <Image
        src={templateData.preview}
        alt={templateData.name}
        fit="cover"
      />
      <Text size="lg" weight={500} style={{ marginTop: "1rem", textAlign: 'center' }}>
        {templateData.name}
      </Text>
    </Card>
  );
};

export default SingleTemplateCard;
