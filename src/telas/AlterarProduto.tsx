import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AlterarProdutosComponent: React.FC<{}> = ({}) => {
  const [formData, setFormData] = useState({
  });
  const navigate = useNavigate();
  return (
    <h1>Altera Produtos</h1>
  );
}
export default AlterarProdutosComponent;