import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const DestacarProdutosComponent: React.FC<{}> = ({}) => {
  const [formData, setFormData] = useState({
  });
  const navigate = useNavigate();
  return (
    <h1>Destacar Produtos</h1>
  );
}
export default DestacarProdutosComponent;