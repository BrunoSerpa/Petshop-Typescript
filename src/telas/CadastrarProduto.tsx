import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const CadastrarProdutosComponent: React.FC<{}> = ({}) => {
  const [formData, setFormData] = useState({
  });
  const navigate = useNavigate();
  return (
    <h1>Cadastrar Produtos</h1>
  );
}
export default CadastrarProdutosComponent;