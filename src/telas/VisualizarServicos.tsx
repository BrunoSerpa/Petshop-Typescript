import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const ServicosComponent: React.FC<{}> = ({}) => {
  const [formData, setFormData] = useState({
  });
  const navigate = useNavigate();
  return (
    <h1>Serviços</h1>
  );
}
export default ServicosComponent;