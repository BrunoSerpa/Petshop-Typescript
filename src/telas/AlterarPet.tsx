import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AlterarPetsComponent: React.FC<{}> = ({}) => {
  const [formData, setFormData] = useState({
  });
  const navigate = useNavigate();
  return (
    <h1>Alterar Pets</h1>
  );
}
export default AlterarPetsComponent;