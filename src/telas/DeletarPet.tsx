import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const DeletarPetComponent: React.FC<{}> = ({}) => {
  const [formData, setFormData] = useState({
  });
  const navigate = useNavigate();
  return (
    <h1>Deletar Pet</h1>
  );
}
export default DeletarPetComponent;