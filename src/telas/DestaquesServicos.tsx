import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const DestacarServicosComponent: React.FC<{}> = ({}) => {
  const [formData, setFormData] = useState({
  });
  const navigate = useNavigate();
  return (
    <h1>Destacar Serviços</h1>
  );
}
export default DestacarServicosComponent;