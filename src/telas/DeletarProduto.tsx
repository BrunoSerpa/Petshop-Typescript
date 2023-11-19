import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const DeletarProdutoComponent: React.FC<{}> = ({}) => {
  const [formData, setFormData] = useState({
  });
  const navigate = useNavigate();
  return (
    <h1>Deletar Produto</h1>
  );
}
export default DeletarProdutoComponent;