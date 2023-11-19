import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const ProdutosComponent: React.FC<{}> = ({}) => {
  const [formData, setFormData] = useState({
  });
  const navigate = useNavigate();
  return (
    <h1>Produto</h1>
  );
}
export default ProdutosComponent;