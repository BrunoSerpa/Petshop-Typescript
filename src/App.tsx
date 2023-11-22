import { useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom';

import Empresa from './modelo/empresa';
import Cliente from './modelo/cliente';
import Produto from './modelo/produto';
import Servico from './modelo/servico';

import Navbar from './telas/Navbar';
import ClientesComponent from './telas/VisualizarClientes';
import PetsComponent from './telas/VisualizarPets';
import ProdutosComponent from './telas/VisualizarProdutos';
import ServicosComponent from './telas/VisualizarServicos';

import ConsumirComponent from './telas/Consumir';
import CadastrarClienteComponent from './telas/CadastrarCliente';
import CadastrarProdutosComponent from './telas/CadastrarProduto';
import CadastrarServicosComponent from './telas/AlterarServico';
import CadastrarPetsComponent from './telas/CadastrarPet';
import DestacarClientesComponent from './telas/DestaquesClientes';
import DestacarProdutosComponent from './telas/DestaquesProdutos';
import DestacarServicosComponent from './telas/DestaquesServicos';
import AlterarClienteComponent from './telas/AlterarCliente';
import AlterarProdutosComponent from './telas/AlterarProduto';
import AlterarServicosComponent from './telas/AlterarServico';
import AlterarPetsComponent from './telas/AlterarPet';

import EmpresaTeste from './app/empresaTeste';

export let empresa = new Empresa();
let empresaTeste = new EmpresaTeste();  
const clientesIniciais = empresaTeste.clientesEmpresaTeste();
const produtosIniciais = empresaTeste.produtosEmpresaTeste();
const servicosIniciais = empresaTeste.servicosEmpresaTeste();
empresa.setClientes = clientesIniciais;
empresa.setProdutos = produtosIniciais;
empresa.setServicos = servicosIniciais;
empresaTeste.produtosEServicosConsumidosTeste();

function App() {
  const [clientesState, setClientes] = useState(clientesIniciais);
  const [produtosState, setProdutos] = useState(produtosIniciais);
  const [servicosState, setServicos] = useState(servicosIniciais);
  
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route index element={<ClientesComponent clientes={clientesState} setClientes={setClientes}/>} />
          <Route path="/cadastrar-cliente" element={<CadastrarClienteComponent clientes={clientesState} />} />
          <Route path="/alterar-cliente/:index" element={<AlterarClienteWrapper clientes={clientesState}/>} />
          <Route path="/cadastrar-pet" element={<CadastrarPetsComponent clientes={clientesState}/>} />
          <Route path="/alterar-pet/:index" element={<AlterarPetWrapper clientes={clientesState} />} />
          <Route path="/produtos" element={<ProdutosComponent produtos={produtosState} setProdutos={setProdutos}/>} />
          <Route path="/cadastrar-produto" element={<CadastrarProdutosComponent produtos={produtosState}/>} />
          <Route path="/alterar-produto/:index" element={<AlterarProdutoWrapper produtos={produtosState} />} />
          <Route path="/servicos" element={<ServicosComponent/>}/>
          <Route path="/cadastrar-servico" element={<CadastrarServicosComponent/>}  />
          <Route path="/pets" element={<PetsComponent clientes={clientesState} setClientes={setClientes}/>} />
          <Route path="/destacar-clientes/" element={<DestacarClientesComponent/>}/>
          <Route path="/destacar-produtos/" element={<DestacarProdutosComponent/>}/>
          <Route path="/destacar-servicos/" element={<DestacarServicosComponent/>}/>
          <Route path="/consumir" element={<ConsumirComponent/>} />
          <Route path='*' element={<ClientesComponent clientes={clientesState} setClientes={setClientes}/>} />
        </Routes>
      </Router>
    </div>
  );
}

const AlterarClienteWrapper = ({ clientes }: { clientes: Array<Cliente> }) => {
  const { index } = useParams();
  if (index) {
    const indexInt = parseInt(index, 10);
    return <AlterarClienteComponent clientes={clientes} posicaoCliente={indexInt} />;
  } else {
    return <Navigate to="/clientes" />;
  }
};
const AlterarProdutoWrapper = ({ produtos }: { produtos: Array<Produto> }) => {
  const { index } = useParams();
  if (index) {
    const indexInt = parseInt(index, 10);
    return <AlterarProdutosComponent produtos={produtos} posicaoProduto={indexInt}/>;
  } else {
    return <Navigate to="/produtos" />;
  }
};  
const AlterarServicoWrapper = ({ servicos }: { servicos: Array<Servico> }) => {
  const { index } = useParams();
  if (index) {
    const indexInt = parseInt(index, 10);
    return <AlterarServicosComponent/>;
  } else {
    return <Navigate to="/servicos" />;
  }
};
const AlterarPetWrapper = ({ clientes }: { clientes: Array<Cliente> }) => {
  const { index } = useParams();
  if (index) {
    const [idCliente, idPet] = index.split('-').map(Number);
    if (!isNaN(idPet) && !isNaN(idCliente)) {
      return <AlterarPetsComponent clientes={clientes} posicaoCliente={idCliente} posicaoPet={idPet} />;
    }
  }
  return <Navigate to="/pets" />;
}
export default App;
