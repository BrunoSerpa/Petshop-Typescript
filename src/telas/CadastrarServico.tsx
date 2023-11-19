import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const CadastrarServicosComponent: React.FC<{}> = ({}) => {
  const [formData, setFormData] = useState({
  });
  const navigate = useNavigate();
  return (
    <h1>Cadastrar Serviços</h1>
  );
}
export default CadastrarServicosComponent;