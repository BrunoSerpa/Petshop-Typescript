import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const DestacarClientesComponent: React.FC<{}> = ({}) => {
  const [formData, setFormData] = useState({
  });
  const navigate = useNavigate();
  return (
    <h1>Destacar Clientes</h1>
  );
}
export default DestacarClientesComponent;