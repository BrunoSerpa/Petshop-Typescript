import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const ClientesComponent: React.FC<{}> = ({}) => {
  const [formData, setFormData] = useState({
  });
  const navigate = useNavigate();
  return (
    <h1>Clientes</h1>
  );
}
export default ClientesComponent;