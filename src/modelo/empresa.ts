import { InCliente, InItemVenda } from "./Interfaces";
import Cliente from "./cliente";
import ItemVenda from "./itemVenda";

function Empresa() {
    let clientes: ReturnType<typeof Cliente>[] = [];
    let produtos: ReturnType<typeof ItemVenda>[] = [];
    let servicos: ReturnType<typeof ItemVenda>[] = [];

    const setClientes = (novosClientes: InCliente[]) => {
        clientes = novosClientes.map(cliente => Cliente(cliente));
    }

    const setProdutos = (novosProdutos: InItemVenda[]) => {
        produtos = novosProdutos.map(produto => ItemVenda(produto));
    }

    const setServicos = (novosServicos: InItemVenda[]) => {
        servicos = novosServicos.map(servico => ItemVenda(servico));
    }

    const getClientes = () => {
        return clientes;
    }

    const getProdutos = () => {
        return produtos;
    }

    const getServicos = () => {
        return servicos;
    }

    return {
        setClientes,
        setProdutos,
        setServicos,
        getClientes,
        getProdutos,
        getServicos
    };
}

export default Empresa;
