import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const CadastrarPetsComponent: React.FC<{}> = ({}) => {
  const [formData, setFormData] = useState({
  });
  const navigate = useNavigate();
  return (
    <h1>Cadastrar Pets</h1>
  );
}
export default CadastrarPetsComponent;