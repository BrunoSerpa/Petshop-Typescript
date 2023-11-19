import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const DeletarClienteComponent: React.FC<{}> = ({}) => {
  const [formData, setFormData] = useState({
  });
  const navigate = useNavigate();
  return (
    <h1>Deletar Cliente</h1>
  );
}
export default DeletarClienteComponent;