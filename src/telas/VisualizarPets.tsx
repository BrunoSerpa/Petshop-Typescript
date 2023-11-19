import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const PetsComponent: React.FC<{}> = ({}) => {
  const [formData, setFormData] = useState({
  });
  const navigate = useNavigate();
  return (
    <h1>Pets</h1>
  );
}
export default PetsComponent;