import { useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom';
import Empresa from './modelo/empresa';
import EmpresaTeste from './app/empresaTeste';
import ClientesComponent from './Telas/VisualizarClientes';
import CadastrarClienteComponent from './Telas/CadastrarCliente';
import CadastrarPetsComponent from './Telas/CadastrarPet';
import ProdutosComponent from './Telas/VisualizarProdutos';
import CadastrarProdutosComponent from './Telas/CadastrarProduto';
import ServicosComponent from './Telas/VisualizarServicos';
import CadastrarServicosComponent from './Telas/CadastrarServico';
import PetsComponent from './Telas/VisualizarPets';
import DestacarClientesComponent from './Telas/DestaquesClientes';
import ConsumirProdutoComponent from './Telas/ConsumirProdutos';
import ConsumirServicoComponent from './Telas/ConsumirServicos';
import Cliente from './modelo/cliente';
import AlterarClienteComponent from './Telas/AlterarCliente';
import Produto from './modelo/produto';
import AlterarProdutosComponent from './Telas/AlterarProduto';
import Servico from './modelo/servico';
import AlterarServicosComponent from './Telas/AlterarServico';
import AlterarPetsComponent from './Telas/AlterarPet';
import Navbar from './Telas/Navbar';
import DestacarItensComponent from './Telas/DestaquesItens';

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
          <Route index element={<ClientesComponent clientes={clientesState} setClientes={setClientes} />} />
          <Route path="/cadastrar-cliente" element={<CadastrarClienteComponent clientes={clientesState} />} />
          <Route path="/alterar-cliente/:index" element={<AlterarClienteWrapper clientes={clientesState} />} />
          <Route path="/cadastrar-pet" element={<CadastrarPetsComponent clientes={clientesState} />} />
          <Route path="/alterar-pet/:index" element={<AlterarPetWrapper clientes={clientesState} />} />
          <Route path="/produtos" element={<ProdutosComponent produtos={produtosState} setProdutos={setProdutos} />} />
          <Route path="/cadastrar-produto" element={<CadastrarProdutosComponent produtos={produtosState} />} />
          <Route path="/alterar-produto/:index" element={<AlterarProdutoWrapper produtos={produtosState} />} />
          <Route path="/servicos" element={<ServicosComponent servicos={servicosState} setServicos={setServicos} />} />
          <Route path="/cadastrar-servico" element={<CadastrarServicosComponent servicos={servicosState} />} />
          <Route path="/alterar-servico/:index" element={<AlterarServicoWrapper servicos={servicosState} />} />
          <Route path="/pets" element={<PetsComponent clientes={clientesState} setClientes={setClientes} />} />
          <Route path="/destacar-clientes" element={<DestacarClientesComponent clientes={clientesState} />} />
          <Route path="/destacar-itens" element={<DestacarItensComponent clientes={clientesState} />} />
          <Route path="/consumir-produto" element={<ConsumirProdutoComponent clientes={clientesState} produtos={produtosState} setClientes={setClientes} />} />
          <Route path="/consumir-servico" element={<ConsumirServicoComponent clientes={clientesState} servicos={servicosState} setClientes={setClientes} />} />
          <Route path='*' element={<ClientesComponent clientes={clientesState} setClientes={setClientes} />} />
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
    return <AlterarProdutosComponent produtos={produtos} posicaoProduto={indexInt} />;
  } else {
    return <Navigate to="/produtos" />;
  }
};
const AlterarServicoWrapper = ({ servicos }: { servicos: Array<Servico> }) => {
  const { index } = useParams();
  if (index) {
    const indexInt = parseInt(index, 10);
    return <AlterarServicosComponent servicos={servicos} posicaoServico={indexInt} />;
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
