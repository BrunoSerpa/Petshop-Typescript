import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const ConsumirComponent: React.FC<{}> = ({}) => {
  const [formData, setFormData] = useState({
  });
  const navigate = useNavigate();
  return (
    <h1>Consumir</h1>
  );
}
export default ConsumirComponent;