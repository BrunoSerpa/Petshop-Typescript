import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AlterarClienteComponent: React.FC<{}> = ({}) => {
  const [formData, setFormData] = useState({
  });
  const navigate = useNavigate();
  return (
    <h1>Alterar Cliente</h1>
  );
}
export default AlterarClienteComponent;